import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data, error } = await supabase
    .rpc('get_random_question');
  console.log(error);
  console.log(data);

  if (error || !data || data.length === 0) {
    return NextResponse.json({ error: 'No problem found' }, { status: 500 });
  }

  // Transform the database question to match your frontend Problem interface
  const dbQuestion = data[0];
  console.log(dbQuestion);
  
  // Parse samples into the expected format
  const examples = Array.isArray(dbQuestion.samples) 
    ? dbQuestion.samples.map(sample => ({
        input: sample.input,
        output: sample.output,
        explanation: sample.explanation || undefined
      }))
    : [];
  
  // Create test cases from samples
  const testCases = examples.map((example, index) => ({
    id: index + 1,
    input: example.input,
    expectedOutput: example.output
  }));

  // Map difficulty number to string
  let difficultyString: "Easy" | "Medium" | "Hard" = "Medium";
  if (dbQuestion.difficulty <= 1200) difficultyString = "Easy";
  else if (dbQuestion.difficulty >= 2000) difficultyString = "Hard";

  // Extract constraints from input_spec and output_spec
  const constraints = [
    `Time limit: ${dbQuestion.time_limit}`,
    `Memory limit: ${dbQuestion.memory_limit}`,
    ...(dbQuestion.input_spec?.split('\n') || []),
    ...(dbQuestion.output_spec?.split('\n') || [])
  ].filter(Boolean);

  const problem = {
    id: dbQuestion.id,
    title: dbQuestion.title,
    description: dbQuestion.description,
    examples,
    constraints,
    difficulty: difficultyString,
    testCases,
    url: dbQuestion.url
  };

  return NextResponse.json(problem);
}
