"use client";

import React, { useEffect } from "react";
import { useInterviewStore } from "@/store/interviewStore";
import { sampleProblem } from "@/data/sampleProblem";
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
  const { problem, setProblem } = useInterviewStore();

  // Load the sample problem on mount
  useEffect(() => {
    if (!problem) setProblem(sampleProblem);
  }, [problem, setProblem]);

  return (
    <main className="h-screen w-screen bg-background text-foreground">
      <div className="flex flex-col h-full">
        {/* Header - Now cleaner with fewer items */}
        <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-card">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold">AI LeetCode Interviewer</span>
          </div>
          <div className="flex items-center gap-3">
            <Timer />
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </header>

        {/* Main Resizable Panels */}
        <PanelGroup direction="horizontal" className="flex-1 min-h-0">
          {/* Left Panel: Problem Description with AI Avatar & Submit at bottom */}
          <Panel
            defaultSize={35}
            minSize={20}
            maxSize={60}
            className="min-w-[300px] flex flex-col h-full bg-card border-r border-border"
          >
            {/* Problem description takes most of the space */}
            <div className="flex-1 min-h-0 overflow-auto">
              <ProblemDescription />
            </div>
            
            {/* AI Avatar and Submit button at bottom */}
            <div className="border-t border-border p-3 flex items-center justify-between">
              <AIAvatar />
              <RunCode />
            </div>
          </Panel>
          
          <PanelResizeHandle className="w-2 cursor-col-resize bg-border hover:bg-primary transition-colors" />

          {/* Right Panel: Code + Test Cases */}
          <Panel
            defaultSize={65}
            minSize={30}
            className="flex flex-col h-full bg-card"
          >
            <div className="flex-1 min-h-0 p-4 flex flex-col">
              <PanelGroup direction="vertical" className="flex-1 min-h-0">
                <Panel defaultSize={70} minSize={30} className="flex-1 min-h-0">
                  <div className="mb-2">
                    <h2 className="text-lg font-semibold">Code Editor</h2>
                  </div>
                  <CodeEditor />
                </Panel>
                <PanelResizeHandle className="h-2 cursor-row-resize bg-border hover:bg-primary transition-colors" />
                <Panel defaultSize={4} minSize={4} className="min-h-[40px]">
                  <TestCases />
                </Panel>
              </PanelGroup>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </main>
  );
}
