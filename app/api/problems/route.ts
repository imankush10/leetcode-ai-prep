import { NextRequest, NextResponse } from 'next/server';
import { getRandomProblem, getProblemById, getAllProblems } from '@/lib/problems';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const random = searchParams.get('random');

    if (random === 'true') {
      const problem = getRandomProblem();
      return NextResponse.json({
        success: true,
        data: problem
      });
    }

    if (id) {
      const problem = getProblemById(id);
      if (!problem) {
        return NextResponse.json({
          success: false,
          error: 'Problem not found'
        }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        data: problem
      });
    }

    // Return all problems
    const problems = getAllProblems();
    return NextResponse.json({
      success: true,
      data: problems
    });

  } catch (error) {
    console.error('Error fetching problems:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
