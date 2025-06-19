import React, { useEffect } from "react";
import { useInterviewStore } from "@/store/interviewStore";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Check, X } from "lucide-react";

interface Judge0TestResult {
  input: string;
  expectedOutput: string;
  result: "pass" | "fail";
  output: string | null;
}

export function TestCases() {
  const { problem, selectedTestCase, setSelectedTestCase, testResults } =
    useInterviewStore();

  if (!problem || !problem.testCases) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="text-muted-foreground">No test cases available</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Tabs
        defaultValue="testcases"
        className="w-full h-full flex flex-col overflow-hidden"
      >
        <TabsList className="w-full flex-shrink-0 ">
          <TabsTrigger value="testcases" className="flex-1 ">
            Test Cases
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="testcases"
          className="flex-1 min-h-0 overflow-hidden"
        >
          <div className="h-full overflow-y-auto p-2 space-y-2 hide-scrollbar">
            {problem.testCases.map((testCase, index) => {
              const testResult: Judge0TestResult | undefined = (
                testResults as Judge0TestResult[]
              )?.[index];

              const isSelected = selectedTestCase === index;

              return (
                <div
                  key={index}
                  className={`p-3 border rounded-md ${
                    testResult?.result === "pass"
                      ? "border-green-500/30 bg-green-500/10"
                      : testResult?.result === "fail"
                      ? "border-red-500/30 bg-red-500/10"
                      : "border-border"
                  } hover:border-primary/50 cursor-pointer transition-colors ${
                    isSelected ? "ring-2 ring-primary/20" : ""
                  }`}
                  onClick={() => setSelectedTestCase(index)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Test Case {index + 1}</span>
                    <div className="flex gap-2">
                      {testResult?.result && (
                        <span
                          className={`inline-flex items-center ${
                            testResult.result === "pass"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {testResult.result === "pass" ? (
                            <Check size={16} className="mr-1" />
                          ) : (
                            <X size={16} className="mr-1" />
                          )}
                          {testResult.result}
                        </span>
                      )}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="mt-3 space-y-2 text-sm">
                      <div>
                        <div className="text-muted-foreground mb-1">Input:</div>
                        <pre className="bg-secondary/50 p-2 rounded overflow-x-auto text-xs">
                          {testCase.input}
                        </pre>
                      </div>
                      <div>
                        <div className="text-muted-foreground mb-1">
                          Expected Output:
                        </div>
                        <pre className="bg-secondary/50 p-2 rounded overflow-x-auto text-xs">
                          {testCase.expectedOutput}
                        </pre>
                      </div>
                      {testResult?.output !== null &&
                        testResult?.output !== undefined && (
                          <div>
                            <div className="text-muted-foreground mb-1">
                              Your Output:
                            </div>
                            <pre
                              className={`p-2 rounded overflow-x-auto text-xs ${
                                testResult.result === "pass"
                                  ? "bg-green-500/10 border border-green-500/20"
                                  : "bg-red-500/10 border border-red-500/20"
                              }`}
                            >
                              {testResult.output}
                            </pre>
                          </div>
                        )}
                      {testResult?.result === "fail" && testResult?.output && (
                        <div>
                          <div className="text-red-500 mb-1">Error:</div>
                          <pre className="bg-red-500/10 border border-red-500/20 p-2 rounded overflow-x-auto text-red-400 text-xs">
                            {testResult.output}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
