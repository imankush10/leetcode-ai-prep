import React from 'react';
import { useInterviewStore } from '@/store/interviewStore';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Play, Check, X } from 'lucide-react';

export function TestCases() {
  const { testCases, runTestCase, selectedTestCase, setSelectedTestCase } = useInterviewStore();
  
  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="testcases" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="testcases" className="flex-1">Test Cases</TabsTrigger>
          <TabsTrigger value="custom" className="flex-1">Custom Input</TabsTrigger>
        </TabsList>
        
        <TabsContent value="testcases" className="h-full overflow-auto">
          <div className="space-y-2 p-2">
            {testCases.map((testCase) => (
              <div 
                key={testCase.id}
                className={`p-3 border rounded-md ${
                  testCase.result === 'pass' 
                    ? 'border-green-500/30 bg-green-500/10' 
                    : testCase.result === 'fail' 
                      ? 'border-red-500/30 bg-red-500/10' 
                      : 'border-border'
                } hover:border-primary/50 cursor-pointer transition-colors`}
                onClick={() => setSelectedTestCase(testCase.id)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">Test Case {testCase.id}</span>
                  <div className="flex gap-2">
                    {testCase.result && (
                      <span className={`inline-flex items-center ${
                        testCase.result === 'pass' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {testCase.result === 'pass' ? (
                          <Check size={16} className="mr-1" />
                        ) : (
                          <X size={16} className="mr-1" />
                        )}
                        {testCase.result}
                      </span>
                    )}
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="h-7 w-7 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        runTestCase(testCase.id);
                      }}
                    >
                      <Play size={14} />
                    </Button>
                  </div>
                </div>
                
                {(selectedTestCase === testCase.id) && (
                  <div className="mt-3 space-y-2 text-sm">
                    <div>
                      <div className="text-muted-foreground mb-1">Input:</div>
                      <pre className="bg-secondary/50 p-2 rounded overflow-x-auto">{testCase.input}</pre>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Expected Output:</div>
                      <pre className="bg-secondary/50 p-2 rounded overflow-x-auto">{testCase.expectedOutput}</pre>
                    </div>
                    {testCase.output && (
                      <div>
                        <div className="text-muted-foreground mb-1">Your Output:</div>
                        <pre className="bg-secondary/50 p-2 rounded overflow-x-auto">{testCase.output}</pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="custom" className="h-full flex flex-col">
          <div className="p-2 flex-1 flex flex-col">
            <textarea 
              className="w-full h-32 bg-secondary/50 border border-border rounded-md p-2 mb-3 resize-none"
              placeholder="Enter your custom test case input..."
            />
            <Button className="self-end">
              <Play size={16} className="mr-2" />
              Run
            </Button>
            
            <div className="mt-4">
              <div className="text-muted-foreground mb-1">Output:</div>
              <pre className="bg-secondary/50 p-2 h-32 rounded overflow-auto border border-border">
                {/* Output will appear here */}
              </pre>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
