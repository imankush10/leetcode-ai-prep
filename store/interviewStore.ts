import { create } from "zustand";

interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
  result?: "pass" | "fail";
  output?: string;
}

interface AIMessage {
  id: number;
  content: string;
  sender: "ai" | "user";
  timestamp: Date;
}

type ProblemDifficulty = "Easy" | "Medium" | "Hard";

interface Problem {
  id: string;
  title: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  difficulty: ProblemDifficulty;
  testCases: TestCase[];
}

interface InterviewState {
  // Timer
  timeRemaining: number;
  isTimerRunning: boolean;
  // Editor
  code: string;
  language: string;
  // Interview state
  currentPhase: "introduction" | "coding" | "discussion";
  problem: Problem | null;
  aiMessages: AIMessage[];
  // Test cases
  testCases: TestCase[];
  selectedTestCase: number | null;
  // UI state
  leftPanelWidth: number;
  // Actions
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  decrementTimer: () => void;
  addAIMessage: (content: string, sender: "ai" | "user") => void;
  setPhase: (phase: "introduction" | "coding" | "discussion") => void;
  setProblem: (problem: Problem) => void;
  setLeftPanelWidth: (width: number) => void;
  runTestCase: (id: number) => void;
  setSelectedTestCase: (id: number | null) => void;
  isAISpeaking: boolean;
  setAISpeaking: (isSpeaking: boolean) => void;
  runAllTestCases: () => void;
}

export const useInterviewStore = create<InterviewState>((set) => ({
  // Timer - 20 minutes in seconds
  timeRemaining: 20 * 60,
  isTimerRunning: false,

  // Editor
  code: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!";\n    return 0;\n}`,
  language: "cpp",

  // Interview state
  currentPhase: "introduction",
  problem: null,
  aiMessages: [
    {
      id: 1,
      content:
        "Hello! I'm your AI interviewer today. We have 20 minutes to solve one coding problem. I'll be here to help if you need any clarification. Are you ready to begin?",
      sender: "ai",
      timestamp: new Date(),
    },
  ],

  // Test cases
  testCases: [],
  selectedTestCase: null,

  // UI state
  leftPanelWidth: 65,

  // Actions
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),

  startTimer: () => set({ isTimerRunning: true }),
  pauseTimer: () => set({ isTimerRunning: false }),
  resetTimer: () => set({ timeRemaining: 20 * 60 }),
  decrementTimer: () =>
    set((state) => ({
      timeRemaining: Math.max(0, state.timeRemaining - 1),
      isTimerRunning: state.timeRemaining > 1 ? state.isTimerRunning : false,
    })),

  addAIMessage: (content, sender) =>
    set((state) => ({
      aiMessages: [
        ...state.aiMessages,
        {
          id: state.aiMessages.length + 1,
          content,
          sender,
          timestamp: new Date(),
        },
      ],
    })),

  setPhase: (phase) => set({ currentPhase: phase }),

  setProblem: (problem) =>
    set((state) => ({
      problem,
      testCases: problem.testCases,
    })),
  isAISpeaking: true,
  setAISpeaking: (isAISpeaking) => set({ isAISpeaking }),

  setLeftPanelWidth: (width) => set({ leftPanelWidth: width }),

  runTestCase: (id) =>
    set((state) => {
      // In a real app, this would actually run the code against the test case
      // Here we're just simulating it with a random result
      const updatedTestCases = state.testCases.map((tc) => {
        if (tc.id === id) {
          const passed = Math.random() > 0.5;
          return {
            ...tc,
            result: passed ? "pass" : "fail",
            output: passed ? tc.expectedOutput : "Failed output",
          };
        }
        return tc;
      });

      return { testCases: updatedTestCases };
    }),
  runAllTestCases: () =>
    set((state) => {
      const updatedTestCases = state.testCases.map((tc) => {
        // In a real app, this would run the code against all test cases
        const passed = Math.random() > 0.3; // Simulate results
        return {
          ...tc,
          result: passed ? "pass" : "fail",
          output: passed ? tc.expectedOutput : "Failed output",
        };
      });
      return { testCases: updatedTestCases };
    }),

  setSelectedTestCase: (id) => set({ selectedTestCase: id }),
}));
