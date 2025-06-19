import React from 'react';
import { Button } from '../ui/button';
import { Play, Loader2 } from 'lucide-react';
import { useInterviewStore } from '@/store/interviewStore';

export function RunCode() {
  const { code, runAllTestCases, isRunningCode } = useInterviewStore();
  
  const handleRunCode = () => {
    runAllTestCases();
  };
  
  return (
    <Button 
      onClick={handleRunCode} 
      className="flex items-center gap-2"
      disabled={!code.trim() || isRunningCode}
    >
      {isRunningCode ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Play size={16} />
      )}
      {isRunningCode ? 'Running...' : 'Run Code'}
    </Button>
  );
}
