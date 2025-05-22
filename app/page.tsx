"use client";

import React, { useEffect } from "react";
import { useInterviewStore } from "@/store/interviewStore";
import { ProblemDescription } from "@/components/ProblemDescription";
import { CodeEditor } from "@/components/CodeEditor";
import { LanguageSelector } from "@/components/LanguageSelector";
import { TestCases } from "@/components/TestCases";
import { AIAvatar } from "@/components/AIAvatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { RunCode } from "@/components/RunCode";

import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { Timer } from "@/components/Timer";

export default function Page() {
  const { problem, fetchRandomProblem, isLoadingProblem, testResults } = useInterviewStore();

  // Fetch a random problem on mount
  useEffect(() => {
    if (!problem) {
      fetchRandomProblem();
    }
  }, [problem, fetchRandomProblem]);

  // Show loading state while fetching problem
  if (isLoadingProblem && !problem) {
    return (
      <main className="h-screen w-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading interview problem...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen w-screen bg-background text-foreground overflow-hidden">
      <div className="flex flex-col h-full">
        <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-card flex-shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold">AI LeetCode Interviewer</span>
            {problem && (
              <span className="text-sm text-muted-foreground">
                Problem: {problem.title} ({problem.difficulty})
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Timer />
            <ThemeToggle />
            <LanguageSelector />
            <button
              onClick={() => fetchRandomProblem()}
              className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded hover:bg-secondary/80"
              disabled={isLoadingProblem}
            >
              {isLoadingProblem ? 'Loading...' : 'New Problem'}
            </button>
          </div>
        </header>

        {/* Main Resizable Panels */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <PanelGroup direction="horizontal" className="h-full">
            {/* Left Panel: Problem Description with AI Avatar & Submit at bottom */}
            <Panel
              defaultSize={35}
              minSize={20}
              maxSize={60}
              className="min-w-[300px] flex flex-col h-full bg-card border-r border-border overflow-hidden"
            >
              <div className="flex-1 min-h-0 overflow-auto">
                <ProblemDescription />
              </div>
              <div className="border-t border-border p-3 flex items-center justify-between flex-shrink-0">
                <AIAvatar />
                <RunCode />
              </div>
            </Panel>

            <PanelResizeHandle className="w-2 cursor-col-resize bg-border hover:bg-primary transition-colors" />

            {/* Right Panel: Code + Test Cases */}
            <Panel
              defaultSize={65}
              minSize={30}
              className="flex flex-col h-full bg-card overflow-hidden"
            >
              <div className="flex-1 min-h-0 p-4 flex flex-col overflow-hidden">
                <PanelGroup direction="vertical" className="flex-1 min-h-0">
                  <Panel 
                    defaultSize={testResults && testResults.length > 0 ? 60 : 80} 
                    minSize={30} 
                    className="flex-1 min-h-0 overflow-hidden"
                  >
                    <div className="h-full flex flex-col overflow-hidden">
                      <div className="mb-2 flex-shrink-0">
                        <h2 className="text-lg font-semibold">Code Editor</h2>
                      </div>
                      <div className="flex-1 min-h-0 overflow-hidden">
                        <CodeEditor />
                      </div>
                    </div>
                  </Panel>
                  
                  <PanelResizeHandle className="h-2 cursor-row-resize bg-border hover:bg-primary transition-colors" />
                  
                  <Panel 
                    defaultSize={testResults && testResults.length > 0 ? 40 : 20} 
                    minSize={15} 
                    className="min-h-[120px] overflow-hidden"
                  >
                    <TestCases />
                  </Panel>
                </PanelGroup>
              </div>
            </Panel>
          </PanelGroup>
        </div>
      </div>
    </main>
  );
}
