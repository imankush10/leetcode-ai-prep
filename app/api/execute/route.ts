import { NextRequest, NextResponse } from 'next/server';
import { getProblemById } from '@/lib/problems';

const JUDGE0_API_URL =
  "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true";

async function runCodeOnJudge0(sourceCode: string, languageId: number) {
  const apiKey = process.env.X_RAPIDAPI_KEY;
  if (!apiKey) throw new Error("RapidAPI key not found");

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
      stdin: "",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

function safeBase64Decode(encodedString: string | null): string {
  try {
    if (!encodedString) return '';
    return Buffer.from(encodedString, 'base64').toString('utf-8');
  } catch {
    return encodedString || '';
  }
}

// 🔑 Flexible comparison function
function compareOutputs(
  actual: string,
  expected: string,
  checkOrder: boolean = true
): boolean {
  try {
    const parsedActual = JSON.parse(actual);
    const parsedExpected = JSON.parse(expected);

    if (Array.isArray(parsedActual) && Array.isArray(parsedExpected)) {
      if (parsedActual.length !== parsedExpected.length) return false;

      if (checkOrder) {
        return parsedActual.every((val, i) => val === parsedExpected[i]);
      } else {
        const sortedA = [...parsedActual].sort();
        const sortedB = [...parsedExpected].sort();
        return sortedA.every((val, i) => val === sortedB[i]);
      }
    }

    return parsedActual === parsedExpected;
  } catch {
    // fallback to trimmed string compare
    return actual.trim() === expected.trim();
  }
}

export async function POST(request: NextRequest) {
  try {
    const { problemId, language, userCode } = await request.json();

    if (!problemId || !language || !userCode) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const problem = getProblemById(problemId);
    if (!problem) {
      return NextResponse.json(
        { success: false, error: 'Problem not found' },
        { status: 404 }
      );
    }

    const languageConfig = problem.languages[language];
    if (!languageConfig) {
      return NextResponse.json(
        { success: false, error: `Language ${language} not supported` },
        { status: 400 }
      );
    }

    const driverCode = languageConfig.driverCode.replace('{{USER_CODE}}', userCode);

    const result = await runCodeOnJudge0(driverCode, languageConfig.judgeLanguageId);

    const decodedStdout = safeBase64Decode(result.stdout);
    const decodedStderr = safeBase64Decode(result.stderr);
    const decodedCompileOutput = safeBase64Decode(result.compile_output);

    if (decodedCompileOutput.trim()) {
      return NextResponse.json({
        success: false,
        error: `Compilation error: ${decodedCompileOutput}`,
        testResults: problem.testCases.map(tc => ({
          ...tc,
          result: 'fail',
          output: `Compilation error: ${decodedCompileOutput}`,
        })),
      });
    }

    if (decodedStderr.trim()) {
      return NextResponse.json({
        success: false,
        error: `Runtime error: ${decodedStderr}`,
        testResults: problem.testCases.map(tc => ({
          ...tc,
          result: 'fail',
          output: `Runtime error: ${decodedStderr}`,
        })),
      });
    }

    if (!decodedStdout.trim()) {
      return NextResponse.json({
        success: false,
        error: 'No output received',
        testResults: problem.testCases.map(tc => ({
          ...tc,
          result: 'fail',
          output: 'No output received',
        })),
      });
    }

    try {
      const outputs = JSON.parse(decodedStdout.trim());
      const testResults = problem.testCases.map((tc, index) => {
        const actualOutput =
          outputs[index] !== undefined ? JSON.stringify(outputs[index]) : "No output";

        const passed = compareOutputs(
          actualOutput,
          tc.expectedOutput,
          tc.checkOrder ?? true // 👈 flag in test case
        );

        return {
          ...tc,
          result: passed ? "pass" : "fail",
          output: actualOutput,
        };
      });

      return NextResponse.json({ success: true, testResults });
    } catch (parseError) {
      return NextResponse.json({
        success: false,
        error: `Parse error: ${decodedStdout}`,
        testResults: problem.testCases.map(tc => ({
          ...tc,
          result: 'fail',
          output: `Parse error: ${decodedStdout}`,
        })),
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
