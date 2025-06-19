import React from 'react';
import { useInterviewStore } from '@/store/interviewStore';

export function ProblemDescription() {
  const { problem } = useInterviewStore();
  
  if (!problem) {
    return <div className="p-4">Loading problem...</div>;
  }
  
  return (
    <div className="p-4 space-y-4 overflow-y-auto h-full hide-scrollbar">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">{problem.title}</h1>
      </div>
      
      <div className="whitespace-pre-line">{problem.description}</div>
      
      {problem.testCases && problem.testCases.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Examples:</h2>
          {problem.testCases.slice(0, 3).map((testCase, index) => (
            <div key={index} className="mb-4 bg-secondary/30 p-3 rounded-md">
              <div className="mb-2">
                <strong>Input:</strong> <code className="bg-muted px-1 py-0.5 rounded text-sm">{testCase.input}</code>
              </div>
              <div className="mb-2">
                <strong>Output:</strong> <code className="bg-muted px-1 py-0.5 rounded text-sm">{testCase.expectedOutput}</code>
              </div>
            </div>
          ))}
          {problem.testCases.length > 3 && (
            <div className="text-sm text-muted-foreground">
              ... and {problem.testCases.length - 3} more test case{problem.testCases.length - 3 > 1 ? 's' : ''}
            </div>
          )}
        </div>
      )}
      
      <div>
        <h2 className="text-lg font-semibold mb-2">Note:</h2>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>You may assume that each input would have exactly one solution</li>
          <li>You may not use the same element twice</li>
          <li>You can return the answer in any order</li>
        </ul>
      </div>
    </div>
  );
}