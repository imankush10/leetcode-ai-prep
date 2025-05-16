'use client';

import React, { useEffect } from 'react';
import { useInterviewStore } from '@/store/interviewStore';
import { sampleProblem } from '@/data/sampleProblem';
import { Timer } from '@/components/Timer';
import { ProblemDescription } from '@/components/ProblemDescription';
import { AIInterviewer } from '@/components/AIInterviewer';
import { CodeEditor } from '@/components/CodeEditor';
import { LanguageSelector } from '@/components/LanguageSelector';
import { TestCases } from '@/components/TestCases';

import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
} from 'react-resizable-panels';

export default function Page() {
  const { problem, setProblem } = useInterviewStore();

  // Load the sample problem on mount
  useEffect(() => {
    if (!problem) setProblem(sampleProblem);
  }, [problem, setProblem]);

  return (
    <main className="h-screen w-screen bg-background text-foreground">
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-card">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold">AI LeetCode Interviewer</span>
            <Timer />
          </div>
          <LanguageSelector />
        </header>

        {/* Main Resizable Panels */}
        <PanelGroup direction="horizontal" className="flex-1 min-h-0">
          {/* Left Panel: Problem + AI */}
          <Panel defaultSize={35} minSize={20} maxSize={60} className="min-w-[300px] flex flex-col h-full bg-card border-r border-border">
            <div className="flex-1 min-h-0">
              <ProblemDescription />
            </div>
            <div className="h-[300px] min-h-[200px] border-t border-border">
              <AIInterviewer />
            </div>
          </Panel>
          <PanelResizeHandle className="w-2 cursor-col-resize bg-border hover:bg-primary transition-colors" />

          {/* Right Panel: Code + Test Cases */}
          <Panel defaultSize={65} minSize={30} className="flex flex-col h-full bg-card">
            <div className="flex-1 min-h-0 p-4 flex flex-col gap-4">
              <div className="flex-1 min-h-0">
                <CodeEditor />
              </div>
              <div className="h-[260px] min-h-[160px]">
                <TestCases />
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </main>
  );
}
