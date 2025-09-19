import { NextRequest, NextResponse } from 'next/server';
import { getProblemById } from '@/lib/problems'; // Make sure this path is correct

// --- Interfaces for Clarity ---
interface TestCase {
  input: any;
  expectedOutput: string;
  checkOrder?: boolean;
}

interface LanguageConfig {
  driverCode: string;
  judgeLanguageId: number;
}

interface Problem {
  id: string;
  testCases: TestCase[];
  languages: Record<string, LanguageConfig>;
}

// --- Judge0 API Interaction ---
const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true";

async function runCodeOnJudge0(sourceCode: string, languageId: number) {
  const apiKey = process.env.X_RAPIDAPI_KEY;
  if (!apiKey) {
    throw new Error("X_RAPIDAPI_KEY environment variable not found");
  }

  const encodedSourceCode = Buffer.from(sourceCode).toString('base64');

  const response = await fetch(JUDGE0_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    body: JSON.stringify({
      source_code: encodedSourceCode,
      language_id: languageId,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Judge0 API error! status: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

// --- Helper Functions ---
function safeBase64Decode(encodedString: string | null): string {
  if (!encodedString) return '';
  try {
    return Buffer.from(encodedString, 'base64').toString('utf-8');
  } catch (error) {
    return encodedString;
  }
}

function compareOutputs(actual: any, expected: any, checkOrder: boolean = true): boolean {
  if (actual === expected) return true;
  if (typeof actual !== 'object' || typeof expected !== 'object' || actual === null || expected === null) {
    return false;
  }

  if (Array.isArray(actual) && Array.isArray(expected)) {
    if (actual.length !== expected.length) return false;

    if (checkOrder) {
      for (let i = 0; i < actual.length; i++) {
        if (!compareOutputs(actual[i], expected[i], true)) return false;
      }
    } else {
      const actualMap = new Map();
      for (const item of actual) {
        const key = JSON.stringify(item);
        actualMap.set(key, (actualMap.get(key) || 0) + 1);
      }

      for (const item of expected) {
        const key = JSON.stringify(item);
        if (!actualMap.has(key) || actualMap.get(key) === 0) return false;
        actualMap.set(key, actualMap.get(key) - 1);
      }
    }
    return true;
  }

  if (!Array.isArray(actual) && !Array.isArray(expected)) {
    const keysActual = Object.keys(actual);
    const keysExpected = Object.keys(expected);
    if (keysActual.length !== keysExpected.length) return false;

    for (const key of keysActual) {
      if (!keysExpected.includes(key) || !compareOutputs(actual[key], expected[key], checkOrder)) {
        return false;
      }
    }
    return true;
  }

  return false;
}

// --- API Route Handler ---
export async function POST(request: NextRequest) {
  try {
    // We only need language and userCode from the client now
    const { language, userCode } = await request.json();

    if (!language || !userCode) {
      return NextResponse.json({ success: false, error: 'Missing required fields: language or userCode' }, { status: 400 });
    }

    // 🔑 Always fetch the "two-sum" problem, ignoring any problemId from the client
    const problem: Problem | undefined = getProblemById('two-sum');

    // Still good practice to check if the problem was actually found
    if (!problem) {
        return NextResponse.json({ success: false, error: "Default problem 'two-sum' could not be found in problems-db.ts" }, { status: 500 });
    }

    const languageConfig = problem.languages[language];
    if (!languageConfig) {
      return NextResponse.json({ success: false, error: `Language '${language}' is not supported for this problem` }, { status: 400 });
    }

    // --- Code Execution ---
    // 🔑 Use the universal placeholder for replacement
    const driverCode = languageConfig.driverCode.replace('{{USER_CODE}}', userCode);
    const result = await runCodeOnJudge0(driverCode, languageConfig.judgeLanguageId);

    const decodedStdout = safeBase64Decode(result.stdout).trim();
    const decodedStderr = safeBase64Decode(result.stderr).trim();
    const decodedCompileOutput = safeBase64Decode(result.compile_output).trim();

    // --- Result Handling ---
    const createTestResult = (status: 'fail' | 'pass', output: string) => 
        problem.testCases.map(tc => ({ ...tc, result: status, output }));

    if (decodedCompileOutput) {
      return NextResponse.json({ success: false, error: 'Compilation Error', testResults: createTestResult('fail', `Compilation Error: ${decodedCompileOutput}`) });
    }
    if (decodedStderr) {
      return NextResponse.json({ success: false, error: 'Runtime Error', testResults: createTestResult('fail', `Runtime Error: ${decodedStderr}`) });
    }
    if (!decodedStdout) {
      return NextResponse.json({ success: false, error: 'No Output', testResults: createTestResult('fail', 'No output was produced by the code.') });
    }

    // --- Output Parsing and Comparison ---
    try {
      const outputs = JSON.parse(decodedStdout);
      if (!Array.isArray(outputs)) {
        throw new Error("Expected an array of results from stdout.");
      }

      const testResults = problem.testCases.map((tc, index) => {
        const actualOutput = outputs[index];
        const expectedOutput = JSON.parse(tc.expectedOutput);
        
        const passed = compareOutputs(actualOutput, expectedOutput, tc.checkOrder ?? true);

        return {
          ...tc,
          result: passed ? "pass" : "fail",
          output: JSON.stringify(actualOutput ?? "No output for this test case"),
        };
      });

      return NextResponse.json({ success: true, testResults });
    } catch (parseError: any) {
      return NextResponse.json({
        success: false,
        error: `Output Parsing Error: Could not parse the output from your code. Ensure it's a valid JSON array. Details: ${parseError.message}`,
        testResults: createTestResult('fail', `Output Parsing Error. Received: ${decodedStdout}`),
      });
    }

  } catch (error: any) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || 'An unexpected internal server error occurred.' },
      { status: 500 }
    );
  }
}
