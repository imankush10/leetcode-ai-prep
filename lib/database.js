import {config} from 'dotenv';
// Load environment variables from .env file
config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
console.log(supabaseUrl, supabaseServiceKey);
if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Supabase URL or Service Key is not defined in environment variables.');
}
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function populateQuestionsDatabase(questionsData) {
  console.log(`Starting to populate database with ${questionsData.length} questions...`);
  
  const batchSize = 50;
  const totalQuestions = questionsData.length;
  let processedCount = 0;
  
  for (let i = 0; i < totalQuestions; i += batchSize) {
    const batch = questionsData.slice(i, i + batchSize);
    
    // Transform the data to match the database schema
    const formattedQuestions = batch.map(question => ({
      id: question.id,
      title: question.title,
      url: question.url,
      description: question.description,
      input_spec: question.inputSpecification,
      output_spec: question.outputSpecification,
      samples: question.samples || [],
      time_limit: question.timeLimit,
      memory_limit: question.memoryLimit,
      tags: question.tags || [],
      difficulty: parseInt(question.tags?.find((tag) => /^\*\d+$/.test(tag))?.replace('*', '') || '0'),
      extracted_at: question.extractedAt || new Date().toISOString()
    }));
    
    // Insert the batch into the database
    const { data, error } = await supabase
      .from('questions')
      .upsert(formattedQuestions, { 
        onConflict: 'id',
        ignoreDuplicates: false
      });
    
    if (error) {
      console.error('Error inserting batch:', error);
      throw error;
    }
    
    processedCount += batch.length;
    console.log(`Processed ${processedCount}/${totalQuestions} questions`);
  }
  
  console.log('Database population completed successfully!');
  return { success: true, count: totalQuestions };
}
