import React from 'react';
import { useInterviewStore } from '@/store/interviewStore';

export function ProblemDescription() {
  const { problem } = useInterviewStore();
  
  if (!problem) {
    return <div className="p-4">Loading problem...</div>;
  }
  
  return (
    <div className="p-4 space-y-4 overflow-y-auto h-full">
      <div>
        <h1 className="text-xl font-bold">{problem.title}</h1>
        <span className={`text-sm font-medium rounded-full px-2 py-0.5 ${
          problem.difficulty === 'Easy' 
            ? 'bg-green-500/20 text-green-500' 
            : problem.difficulty === 'Medium'
              ? 'bg-yellow-500/20 text-yellow-500'
              : 'bg-red-500/20 text-red-500'
        }`}>
          {problem.difficulty}
        </span>
      </div>
      
      <div className="whitespace-pre-line">{problem.description}</div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">Examples:</h2>
        {problem.examples.map((example, index) => (
          <div key={index} className="mb-4 bg-secondary/30 p-3 rounded-md">
            <div className="mb-2">
              <strong>Input:</strong> {example.input}
            </div>
            <div className="mb-2">
              <strong>Output:</strong> {example.output}
            </div>
            {example.explanation && (
              <div>
                <strong>Explanation:</strong> {example.explanation}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-2">Constraints:</h2>
        <ul className="list-disc list-inside">
          {problem.constraints.map((constraint, index) => (
            <li key={index}>{constraint}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}