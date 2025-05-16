import React from 'react';
import { Button } from './ui/button';
import { Play } from 'lucide-react';
import { useInterviewStore } from '@/store/interviewStore';

export function RunCode() {
  const { code, language, runAllTestCases } = useInterviewStore();
  
  const handleRunCode = () => {
    runAllTestCases();
  };
  
  return (
    <Button 
      onClick={handleRunCode} 
      className="flex items-center gap-2"
      disabled={!code.trim()}
    >
      <Play size={16} />
      Run Code
    </Button>
  );
}
