import { NextRequest, NextResponse } from 'next/server';
import { getProblemById } from '@/lib/problems';

const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true"; // Changed to true

async function runCodeOnJudge0(sourceCode: string, languageId: number) {
  const apiKey = process.env.X_RAPIDAPI_KEY;
  if (!apiKey) throw new Error("RapidAPI key not found");

  // Base64 encode the source code
  const encodedSourceCode = Buffer.from(sourceCode).toString('base64');

  const response = await fetch(JUDGE0_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    },
    body: JSON.stringify({
      source_code: encodedSourceCode, // Send base64 encoded
      language_id: languageId,
      stdin: "", // Empty string for stdin
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

// Helper function to safely decode base64
function safeBase64Decode(encodedString: string | null): string {
  try {
    if (!encodedString || encodedString === null) return '';
    return Buffer.from(encodedString, 'base64').toString('utf-8');
  } catch (error) {
    console.warn('Failed to decode base64 string:', error);
    return encodedString || ''; // Return original if decoding fails
  }
}

export async function POST(request: NextRequest) {
  try {
    const { problemId, language, userCode } = await request.json();

    if (!problemId || !language || !userCode) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 });
    }

    const problem = getProblemById(problemId);
    if (!problem) {
      return NextResponse.json({
        success: false,
        error: 'Problem not found'
      }, { status: 404 });
    }

    const languageConfig = problem.languages[language];
    if (!languageConfig) {
      return NextResponse.json({
        success: false,
        error: `Language ${language} not supported for this problem`
      }, { status: 400 });
    }

    // Insert user code into driver code
    const driverCode = languageConfig.driverCode.replace('{{USER_CODE}}', userCode);

    console.log('Executing code for language:', language);

    // Execute on Judge0
    const result = await runCodeOnJudge0(driverCode, languageConfig.judgeLanguageId);

    console.log('Judge0 raw response:', result);

    // Decode base64 responses
    const decodedStdout = safeBase64Decode(result.stdout);
    const decodedStderr = safeBase64Decode(result.stderr);
    const decodedCompileOutput = safeBase64Decode(result.compile_output);

    console.log('Decoded outputs:', {
      stdout: decodedStdout,
      stderr: decodedStderr,
      compile_output: decodedCompileOutput,
      status: result.status
    });

    // Check for compilation errors first
    if (decodedCompileOutput && decodedCompileOutput.trim()) {
      return NextResponse.json({
        success: false,
        error: `Compilation error: ${decodedCompileOutput}`,
        testResults: problem.testCases.map(tc => ({
          ...tc,
          result: 'fail',
          output: `Compilation error: ${decodedCompileOutput}`
        }))
      });
    }

    // Check for runtime errors
    if (decodedStderr && decodedStderr.trim()) {
      return NextResponse.json({
        success: false,
        error: `Runtime error: ${decodedStderr}`,
        testResults: problem.testCases.map(tc => ({
          ...tc,
          result: 'fail',
          output: `Runtime error: ${decodedStderr}`
        }))
      });
    }

    if (!decodedStdout || !decodedStdout.trim()) {
      return NextResponse.json({
        success: false,
        error: 'No output received',
        testResults: problem.testCases.map(tc => ({
          ...tc,
          result: 'fail',
          output: 'No output received'
        }))
      });
    }

    try {
      // Parse the decoded stdout
      const outputs = JSON.parse(decodedStdout.trim());
      const testResults = problem.testCases.map((tc, index) => {
        const actualOutput = outputs[index] !== undefined
          ? JSON.stringify(outputs[index])
          : "No output";
        const passed = actualOutput === tc.expectedOutput;
        return {
          ...tc,
          result: passed ? "pass" : "fail",
          output: actualOutput,
        };
      });

      return NextResponse.json({
        success: true,
        testResults
      });

    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return NextResponse.json({
        success: false,
        error: `Parse error: ${decodedStdout}`,
        testResults: problem.testCases.map(tc => ({
          ...tc,
          result: 'fail',
          output: `Parse error: ${decodedStdout}`
        }))
      });
    }

  } catch (error: any) {
    console.error('Error executing code:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    }, { status: 500 });
  }
}
