// components/AIAvatar.tsx
import React from 'react';
import { useInterviewStore } from '@/store/interviewStore';
import { Bot } from 'lucide-react';

export function AIAvatar() {
  const { isAISpeaking } = useInterviewStore();
  
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        {/* Main AI icon */}
        <Bot 
          size={24} 
          className="text-primary z-10 relative"
        />
        
        {/* Pulsing background when speaking */}
        {isAISpeaking && (
          <span className="absolute inset-0 rounded-full bg-primary/50 animate-ping" />
        )}
        
        {/* Static background glow */}
        <span className="absolute inset-0 rounded-full bg-primary/20" />
      </div>
      
      {/* Optional: Add AI status text */}
      <span className="text-sm text-muted-foreground">
        {isAISpeaking ? "AI Speaking..." : "AI Assistant"}
      </span>
    </div>
  );
}
