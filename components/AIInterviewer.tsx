import React, { useRef, useEffect } from 'react';
import { useInterviewStore } from '@/store/interviewStore';
import { Button } from './ui/button';
import { Send } from 'lucide-react';

export function AIInterviewer() {
  const { aiMessages, addAIMessage, currentPhase } = useInterviewStore();
  const [input, setInput] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to bottom on new message
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages]);
  
  const handleSendMessage = () => {
    if (input.trim()) {
      addAIMessage(input, 'user');
      setInput('');
      
      // Simulate AI response
      setTimeout(() => {
        let response = "I'm analyzing your approach...";
        
        if (input.toLowerCase().includes('hint')) {
          response = "Consider using a hash map to store values you've seen and their indices. This allows you to check if the complement (target - current number) exists in O(1) time.";
        } else if (input.toLowerCase().includes('complexity')) {
          response = "The optimal solution has O(n) time complexity and O(n) space complexity, where n is the length of the input array.";
        } else if (input.toLowerCase().includes('test')) {
          response = "Your solution looks good! Make sure it handles edge cases like empty arrays or when there's only one element.";
        }
        
        addAIMessage(response, 'ai');
      }, 1000);
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {aiMessages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[85%] rounded-lg p-3 ${
              message.sender === 'ai'
                ? 'bg-secondary/50 mr-auto'
                : 'bg-primary/20 ml-auto'
            }`}
          >
            {message.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t border-border p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Ask a question or request a hint..."
            className="flex-1 bg-secondary border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!input.trim()}
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
