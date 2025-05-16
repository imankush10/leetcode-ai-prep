import React, { useEffect } from 'react';
import { useInterviewStore } from '@/store/interviewStore';
import { formatTime } from '@/lib/utils';
import { Clock } from 'lucide-react';

export function Timer() {
  const { timeRemaining, isTimerRunning, decrementTimer } = useInterviewStore();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isTimerRunning) {
      interval = setInterval(() => {
        decrementTimer();
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, decrementTimer]);

  const isWarning = timeRemaining < 300; // Less than 5 minutes

  return (
    <div className={`flex items-center gap-2 text-lg font-mono ${isWarning ? 'text-red-500' : 'text-white'}`}>
      <Clock size={20} />
      <span className="font-bold">{formatTime(timeRemaining)}</span>
    </div>
  );
}