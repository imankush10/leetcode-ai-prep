import { create } from "zustand";
import { Problem, TestCase } from "@/lib/problems";

interface AIMessage {
  id: number;
  content: string;
  sender: "ai" | "user";
  timestamp: Date;
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
  testResults: {
    input: string;
    expectedOutput: string;
    result: "pass" | "fail" | "running";
    output: string | null;
  }[];
  selectedTestCase: number | null;
  // UI state
  leftPanelWidth: number;
  isLoadingProblem: boolean;
  isRunningCode: boolean;
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
  setSelectedTestCase: (id: number | null) => void;
  isAISpeaking: boolean;
  setAISpeaking: (isSpeaking: boolean) => void;
  runAllTestCases: () => Promise<void>; // Changed to Promise<void> as it's async
  fetchRandomProblem: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useInterviewStore = create<InterviewState>((set, get) => ({
  // Timer - 20 minutes in seconds
  timeRemaining: 20 * 60,
  isTimerRunning: false,

  // Editor
  code: "",
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
  testResults: [], // <-- ADD THIS LINE
  selectedTestCase: null,

  // UI state
  leftPanelWidth: 65,
  isLoadingProblem: false,
  isRunningCode: false,

  // Actions
  fetchRandomProblem: async () => {
    try {
      set({ isLoadingProblem: true });
      const response = await fetch("/api/problems?random=true");
      if (!response.ok) {
        // It's good practice to check response.ok
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.success) {
        const state = get();
        const problem = data.data as Problem; // Add type assertion if necessary

        // Ensure we have a valid language for this problem
        const availableLanguages = Object.keys(problem.languages);
        const languageToUse = availableLanguages.includes(state.language) // More robust check
          ? state.language
          : availableLanguages[0] || "cpp"; // Fallback if no languages

        set({
          problem: problem,
          testCases: problem.testCases || [], // Ensure testCases is always an array
          code: problem.languages[languageToUse]?.boilerplate || "",
          language: languageToUse,
          currentPhase: "coding",
          testResults: [], // Reset test results when a new problem is fetched
          selectedTestCase: null, // Reset selected test case
        });
      } else {
        console.error(
          "Failed to fetch problem:",
          data.error || "Unknown error"
        );
        // Optionally, set an error state in the store
      }
    } catch (error) {
      console.error("Error fetching random problem:", error);
      // Optionally, set an error state in the store
    } finally {
      set({ isLoadingProblem: false });
    }
  },
  setCode: (code) => set({ code }),

  startTimer: () => set({ isTimerRunning: true }),
  pauseTimer: () => set({ isTimerRunning: false }),
  resetTimer: () => set({ timeRemaining: 20 * 60, isTimerRunning: false }), // Also reset isTimerRunning
  decrementTimer: () =>
    set((state) => {
      const newTimeRemaining = Math.max(0, state.timeRemaining - 1);
      return {
        timeRemaining: newTimeRemaining,
        isTimerRunning: newTimeRemaining > 0 ? state.isTimerRunning : false, // Stop timer if time is 0
      };
    }),

  addAIMessage: (content, sender) =>
    set((state) => ({
      aiMessages: [
        ...state.aiMessages,
        {
          id: state.aiMessages.length + 1, // Consider a more robust ID generation if messages can be deleted
          content,
          sender,
          timestamp: new Date(),
        },
      ],
    })),

  setPhase: (phase) => set({ currentPhase: phase }),

  setLanguage: (language) =>
    set((state) => {
      const newCode = state.problem?.languages[language]?.boilerplate || "";
      return { language, code: newCode };
    }),

  setProblem: (problem) =>
    set((state) => {
      if (!problem || !problem.languages) {
        return {
          problem,
          testCases: problem?.testCases || [], // Ensure testCases is always an array
          code: "",
          testResults: [], // Reset test results
          selectedTestCase: null,
        };
      }
      const availableLanguages = Object.keys(problem.languages);
      if (availableLanguages.length === 0) {
        return {
          problem,
          testCases: problem.testCases || [],
          code: "",
          language: "cpp", // Default language if none available for problem
          testResults: [],
          selectedTestCase: null,
        };
      }
      const currentLanguage = state.language || "cpp"; // Use state's language or fallback
      const languageToUse = availableLanguages.includes(currentLanguage)
        ? currentLanguage
        : availableLanguages[0];

      return {
        problem,
        testCases: problem.testCases || [],
        language: languageToUse,
        code: problem.languages[languageToUse]?.boilerplate || "",
        testResults: [], // Reset test results
        selectedTestCase: null,
      };
    }),

  isAISpeaking: true, // Initial state for isAISpeaking
  setAISpeaking: (isAISpeaking) => set({ isAISpeaking }),

  setLeftPanelWidth: (width) => set({ leftPanelWidth: width }),

  setLoading: (loading) => set({ isLoadingProblem: loading }), // isLoadingProblem or a general loading state?

  runAllTestCases: async () => {
    const state = get();
    if (!state.problem || !state.code.trim() || !state.problem.testCases) {
      set({ testResults: [], isRunningCode: false });
      return;
    }

    try {
      set({ isRunningCode: true });

      // Set loading state - use Judge0 format
      const loadingResults = state.problem.testCases.map((testCase, index) => ({
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        result: "running" as "running",
        output: "Running...",
      }));
      set({ testResults: loadingResults });

      const response = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problemId: state.problem.id,
          language: state.language,
          userCode: state.code,
        }),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: `HTTP error! status: ${response.status}` }));
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      if (data.success && Array.isArray(data.testResults)) {
        set({ testResults: data.testResults });
      } else {
        const errorMessage = data.error || "Execution failed";
        console.error("Execution error:", data);

        // Create error results in Judge0 format
        const errorResults = state.problem.testCases.map((testCase) => ({
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          result: "fail" as "fail",
          output: null,
        }));
        set({ testResults: errorResults });
      }
    } catch (error: any) {
      console.error("Error running test cases:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      // Create error results in Judge0 format
      const errorResults = state.problem.testCases.map((testCase) => ({
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        result: "fail" as "fail",
        output: null,
      }));
      set({ testResults: errorResults });
    } finally {
      set({ isRunningCode: false });
    }
  },

  setSelectedTestCase: (id) => set({ selectedTestCase: id }),
}));
