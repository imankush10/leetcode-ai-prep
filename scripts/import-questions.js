import { populateQuestionsDatabase } from '../lib/database.js';
import fs from 'fs';
import path from 'path';

async function importQuestions() {
  try {
    const filePath = path.join(process.cwd(), 'data.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const questions = JSON.parse(fileData);
    
    // Ensure the data is in array format
    const questionsArray = Array.isArray(questions) ? questions : Object.values(questions);
    
    // Optional: Log a sample to verify structure
    console.log("Sample data (first item):", questionsArray[0]);
    console.log(`Total questions to import: ${questionsArray.length}`);
    
    await populateQuestionsDatabase(questionsArray);
    console.log('Import completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
}

importQuestions();
