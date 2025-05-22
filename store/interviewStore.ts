import { create } from "zustand";
import { Problem, TestCase } from "@/lib/problems";

// ===== INTERFACES =====
interface AIMessage {
  id: number;
  content: string;
  sender: "ai" | "user";
  timestamp: Date;
}

interface TestResult {
  input: string;
  expectedOutput: string;
  result: "pass" | "fail" | "running";
  output: string | null;
}

interface InterviewState {
  // ===== TIMER STATE =====
  timeRemaining: number;
  isTimerRunning: boolean;

  // ===== CODE EDITOR STATE =====
  code: string;
  language: string;

  // ===== PROBLEM STATE =====
  problem: Problem | null;
  isLoadingProblem: boolean;

  // ===== TEST EXECUTION STATE =====
  testCases: TestCase[];
  testResults: TestResult[];
  selectedTestCase: number | null;
  isRunningCode: boolean;

  // ===== AI INTERVIEW STATE (DUMMY - TO BE IMPLEMENTED) =====
  currentPhase: "introduction" | "coding" | "discussion";
  aiMessages: AIMessage[];
  isAISpeaking: boolean;

  // ===== UI STATE =====
  leftPanelWidth: number;

  // ===== TIMER ACTIONS =====
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  decrementTimer: () => void;

  // ===== CODE EDITOR ACTIONS =====
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;

  // ===== PROBLEM ACTIONS =====
  fetchRandomProblem: () => Promise<void>;
  setProblem: (problem: Problem) => void;
  setLoading: (loading: boolean) => void;

  // ===== TEST EXECUTION ACTIONS =====
  runAllTestCases: () => Promise<void>;
  setSelectedTestCase: (id: number | null) => void;

  // ===== AI INTERVIEW ACTIONS (DUMMY - TO BE IMPLEMENTED) =====
  addAIMessage: (content: string, sender: "ai" | "user") => void;
  setPhase: (phase: "introduction" | "coding" | "discussion") => void;
  setAISpeaking: (isSpeaking: boolean) => void;

  // ===== UI ACTIONS =====
  setLeftPanelWidth: (width: number) => void;
}

export const useInterviewStore = create<InterviewState>((set, get) => ({
  // ===== TIMER INITIAL STATE =====
  timeRemaining: 20 * 60, // 20 minutes in seconds
  isTimerRunning: false,

  // ===== CODE EDITOR INITIAL STATE =====
  code: "",
  language: "cpp",

  // ===== PROBLEM INITIAL STATE =====
  problem: null,
  isLoadingProblem: false,

  // ===== TEST EXECUTION INITIAL STATE =====
  testCases: [],
  testResults: [],
  selectedTestCase: null,
  isRunningCode: false,

  // ===== AI INTERVIEW INITIAL STATE (DUMMY) =====
  currentPhase: "introduction",
  aiMessages: [
    {
      id: 1,
      content: "Hello! I'm your AI interviewer today. We have 20 minutes to solve one coding problem. I'll be here to help if you need any clarification. Are you ready to begin?",
      sender: "ai",
      timestamp: new Date(),
    },
  ],
  isAISpeaking: false,

  // ===== UI INITIAL STATE =====
  leftPanelWidth: 65,

  // ===== TIMER ACTIONS =====
  startTimer: () => set({ isTimerRunning: true }),
  
  pauseTimer: () => set({ isTimerRunning: false }),
  
  resetTimer: () => set({ 
    timeRemaining: 20 * 60, 
    isTimerRunning: false 
  }),
  
  decrementTimer: () =>
    set((state) => {
      const newTimeRemaining = Math.max(0, state.timeRemaining - 1);
      return {
        timeRemaining: newTimeRemaining,
        isTimerRunning: newTimeRemaining > 0 ? state.isTimerRunning : false,
      };
    }),

  // ===== CODE EDITOR ACTIONS =====
  setCode: (code) => set({ code }),
  
  setLanguage: (language) =>
    set((state) => {
      const newCode = state.problem?.languages[language]?.boilerplate || "";
      return { language, code: newCode };
    }),

  // ===== PROBLEM ACTIONS =====
  fetchRandomProblem: async () => {
    try {
      set({ isLoadingProblem: true });
      
      const response = await fetch("/api/problems?random=true");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        const state = get();
        const problem = data.data as Problem;

        // Determine language to use
        const availableLanguages = Object.keys(problem.languages);
        const languageToUse = availableLanguages.includes(state.language)
          ? state.language
          : availableLanguages[0] || "cpp";

        set({
          problem: problem,
          testCases: problem.testCases || [],
          code: problem.languages[languageToUse]?.boilerplate || "",
          language: languageToUse,
          currentPhase: "coding",
          testResults: [],
          selectedTestCase: null,
        });
      } else {
        console.error("Failed to fetch problem:", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching random problem:", error);
    } finally {
      set({ isLoadingProblem: false });
    }
  },

  setProblem: (problem) =>
    set((state) => {
      if (!problem || !problem.languages) {
        return {
          problem,
          testCases: problem?.testCases || [],
          code: "",
          testResults: [],
          selectedTestCase: null,
        };
      }

      const availableLanguages = Object.keys(problem.languages);
      if (availableLanguages.length === 0) {
        return {
          problem,
          testCases: problem.testCases || [],
          code: "",
          language: "cpp",
          testResults: [],
          selectedTestCase: null,
        };
      }

      const currentLanguage = state.language || "cpp";
      const languageToUse = availableLanguages.includes(currentLanguage)
        ? currentLanguage
        : availableLanguages[0];

      return {
        problem,
        testCases: problem.testCases || [],
        language: languageToUse,
        code: problem.languages[languageToUse]?.boilerplate || "",
        testResults: [],
        selectedTestCase: null,
      };
    }),

  setLoading: (loading) => set({ isLoadingProblem: loading }),

  // ===== TEST EXECUTION ACTIONS =====
  runAllTestCases: async () => {
    const state = get();
    if (!state.problem || !state.code.trim() || !state.problem.testCases) {
      set({ testResults: [], isRunningCode: false });
      return;
    }

    try {
      set({ isRunningCode: true });

      // Set loading state for all test cases
      const loadingResults = state.problem.testCases.map((testCase) => ({
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        result: "running" as const,
        output: "Running...",
      }));
      set({ testResults: loadingResults });

      const response = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && Array.isArray(data.testResults)) {
        set({ testResults: data.testResults });
      } else {
        throw new Error(data.error || "Execution failed");
      }
    } catch (error: any) {
      console.error("Error running test cases:", error);
      
      // Create error results for all test cases
      const errorResults = state.problem.testCases.map((testCase) => ({
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        result: "fail" as const,
        output: null,
      }));
      set({ testResults: errorResults });
    } finally {
      set({ isRunningCode: false });
    }
  },

  setSelectedTestCase: (id) => set({ selectedTestCase: id }),

  // ===== AI INTERVIEW ACTIONS (DUMMY - TO BE IMPLEMENTED) =====
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

  setAISpeaking: (isSpeaking) => set({ isAISpeaking: isSpeaking }),

  // ===== UI ACTIONS =====
  setLeftPanelWidth: (width) => set({ leftPanelWidth: width }),
}));
