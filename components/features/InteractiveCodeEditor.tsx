import { motion } from "framer-motion";
import { Code, Play, CheckCircle, AlertCircle, Clock, Brain, Mic, Volume2 } from "lucide-react";
import { useState, useEffect } from "react";

const InteractiveCodeEditor = () => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState([]);

  const problems = [
    { 
      title: "Two Sum", 
      difficulty: "Easy", 
      type: "LeetCode",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      example: "Input: [2,7,11,15], target: 9\nOutput: [0,1]",
      requirements: ["Explain your approach", "Discuss time complexity", "Handle edge cases"]
    },
    {
      title: "System Design: Chat App",
      difficulty: "Medium",
      type: "System Design",
      description: "Design a real-time chat application that can handle millions of users. Consider scalability, reliability, and performance.",
      example: "Requirements:\n- Real-time messaging\n- User authentication\n- Message history\n- Online status",
      requirements: ["Architecture overview", "Database design", "API endpoints", "Scalability considerations"]
    },
  ];

  const tabs = ["solution.py", "test.py", "analysis.md"];
  
  const codeContent = [
    // LeetCode content
    [
      `def two_sum(nums, target):
    seen = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in seen:
            return [seen[complement], i]
        
        seen[num] = i
    
    return []`,
      `import pytest
from solution import two_sum

def test_two_sum():
    assert two_sum([2, 7, 11, 15], 9) == [0, 1]
    assert two_sum([3, 2, 4], 6) == [1, 2]
    assert two_sum([3, 3], 6) == [0, 1]`,
      `# Performance Analysis

## Time Complexity: O(n)
- Single pass through array
- HashMap lookup is O(1)

## Space Complexity: O(n)
- HashMap stores up to n elements

## Edge Cases Handled:
✓ Duplicate numbers
✓ No solution exists
✓ Multiple valid pairs`,
    ],
    // System Design content
    [
      `# Chat Application Architecture

## High-Level Components:
- Load Balancer
- API Gateway
- Chat Service
- Message Queue
- Database Cluster
- WebSocket Servers

## Key Design Decisions:
- Microservices architecture
- Horizontal scaling
- Message persistence
- Real-time delivery`,
      `# API Endpoints

## User Management
POST /api/auth/login
POST /api/auth/register
GET /api/users/profile

## Chat Operations
POST /api/chats/create
GET /api/chats/{chatId}/messages
POST /api/chats/{chatId}/send
WebSocket: /ws/chat/{chatId}`,
      `# Scalability Analysis

## Database Sharding:
- Shard by user_id
- Consistent hashing
- Read replicas

## Message Queue:
- Apache Kafka
- Partitioned by chat_id
- Message ordering

## Caching Strategy:
- Redis for active chats
- CDN for media files`,
    ]
  ];

  const feedbackItems = [
    // LeetCode feedback
    [
      {
        type: "success",
        message: "Excellent time complexity optimization using hash map approach",
        icon: CheckCircle,
      },
      { 
        type: "info", 
        message: "Consider edge case: empty array and duplicate values", 
        icon: Brain 
      },
      {
        type: "suggestion",
        message: "Explain your approach step by step for the interviewer",
        icon: Mic,
      },
    ],
    // System Design feedback
    [
      {
        type: "success",
        message: "Good consideration of microservices architecture",
        icon: CheckCircle,
      },
      { 
        type: "info", 
        message: "Discuss data consistency and CAP theorem implications", 
        icon: Brain 
      },
      {
        type: "suggestion",
        message: "Elaborate on message delivery guarantees and failure handling",
        icon: Mic,
      },
    ]
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProcessing(true);
      setTimeout(() => {
        setFeedback(feedbackItems[currentProblem]);
        setIsProcessing(false);
      }, 2000);
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentProblem]);

  const handleProblemChange = (index) => {
    setCurrentProblem(index);
    setCurrentTab(0);
    setFeedback([]);
  };

  return (
    <motion.div
      className="relative max-w-7xl mx-auto bg-gray-950/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Enhanced Header */}
      <div className="flex items-center justify-between border-b border-white/10 p-6 bg-black/20">
        <div className="flex items-center space-x-6">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          <div className="flex space-x-1 bg-white/5 rounded-lg p-1">
            {problems.map((problem, index) => (
              <button
                key={index}
                onClick={() => handleProblemChange(index)}
                className={`px-4 py-2 text-sm rounded-md transition-all duration-200 ${
                  currentProblem === index
                    ? "bg-white/15 text-white shadow-lg"
                    : "text-white/60 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                {problem.title}
              </button>
            ))}
          </div>

          <div className="flex space-x-1 bg-white/5 rounded-lg p-1">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setCurrentTab(index)}
                className={`px-3 py-1 text-xs rounded-md transition-all duration-200 ${
                  currentTab === index
                    ? "bg-white/15 text-white shadow-lg"
                    : "text-white/60 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Interview Status & AI Status */}
        <div className="flex items-center space-x-4">          
          <motion.div
            className="flex items-center space-x-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-4 py-2"
            animate={
              isProcessing
                ? {
                    boxShadow: [
                      "0 0 0 0 rgba(59, 130, 246, 0.4)",
                      "0 0 0 10px rgba(59, 130, 246, 0)",
                    ],
                    scale: [1, 1.02, 1],
                  }
                : {}
            }
            transition={{ duration: 1.5, repeat: isProcessing ? Infinity : 0 }}
          >
            <motion.div
              animate={isProcessing ? { rotate: 360 } : {}}
              transition={{
                duration: 2,
                repeat: isProcessing ? Infinity : 0,
                ease: "linear",
              }}
            >
              <Brain className="w-4 h-4 text-blue-400" />
            </motion.div>
            <span className="text-sm font-medium text-white/90">
              {isProcessing ? "Analyzing..." : "AI Ready"}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Main Content - Improved Widths */}
      <div className="grid grid-cols-12 min-h-[350px]">
        {/* Problem Statement - Wider and Left Aligned */}
        <div className="col-span-3 border-r border-white/10 bg-gray-900/40 p-5">
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white text-left">
                {problems[currentProblem].title}
              </h3>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  problems[currentProblem].difficulty === "Easy"
                    ? "bg-green-500/20 text-green-300"
                    : problems[currentProblem].difficulty === "Medium"
                    ? "bg-yellow-500/20 text-yellow-300"
                    : "bg-red-500/20 text-red-300"
                }`}
              >
                {problems[currentProblem].difficulty}
              </span>
            </div>

            <div className="text-gray-300 text-sm space-y-3 text-left">
              <p className="text-left leading-relaxed">
                {problems[currentProblem].description}
              </p>

              <div className="bg-gray-800/40 p-3 rounded-lg">
                <div className="text-white/80 font-mono text-xs text-left whitespace-pre-line">
                  {problems[currentProblem].example}
                </div>
              </div>

              <div className="space-y-2">
                {problems[currentProblem].requirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                    <span className="text-xs text-left">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Code Editor - Maintained Width */}
        <div className="col-span-6 p-5 font-mono text-sm bg-gradient-to-br from-gray-950/40 to-gray-900/40">
          <div className="flex items-center justify-between mb-4">
            <div className="text-white/40 text-xs text-left">
              Lines: 1-{codeContent[currentProblem][currentTab].split("\n").length} • Python 3.11
            </div>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="flex items-center space-x-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 px-3 py-1 rounded-lg transition-colors"
            >
              <Play className="w-3 h-3 text-green-400" />
              <span className="text-green-400 text-xs">Run Code</span>
            </button>
          </div>

          <motion.pre
            key={`${currentProblem}-${currentTab}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-white/90 leading-relaxed overflow-x-auto text-left"
            style={{ textAlign: 'left' }}
          >
            <code className="text-sm text-left">{codeContent[currentProblem][currentTab]}</code>
          </motion.pre>

          <motion.div
            className="inline-block w-2 h-5 bg-blue-400 ml-1 mt-2"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        </div>

        {/* AI Feedback Panel - Wider and Left Aligned */}
        <div className="col-span-3 border-l border-white/10 bg-black/30 p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white/90 font-semibold text-sm text-left">AI Feedback</h4>
            <motion.div
              className="flex items-center space-x-2 text-xs text-white/60"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Mic className="w-3 h-3" />
              <span>Listening</span>
            </motion.div>
          </div>

          <div className="space-y-3">
            {feedback.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: index * 0.5, duration: 0.6 }}
                className={`p-3 rounded-xl border-l-2 text-left ${
                  item.type === "success"
                    ? "bg-green-500/10 border-green-500/50 text-green-300"
                    : item.type === "info"
                    ? "bg-blue-500/10 border-blue-500/50 text-blue-300"
                    : "bg-yellow-500/10 border-yellow-500/50 text-yellow-300"
                }`}
              >
                <div className="flex items-start space-x-2">
                  <item.icon className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  <p className="text-xs leading-relaxed text-left">{item.message}</p>
                </div>
              </motion.div>
            ))}

            {feedback.length === 0 && !isProcessing && (
              <div className="text-center py-4 text-white/40">
                <Brain className="w-6 h-6 mx-auto mb-2 opacity-50" />
                <p className="text-xs">Start coding to receive AI feedback</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Status Bar */}
      <div className="border-t border-white/10 px-6 py-3 bg-black/40 backdrop-blur-sm">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-6 text-white/60">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Interview Active</span>
            </div>
            <span>{problems[currentProblem].title}</span>
            <span>Difficulty: {problems[currentProblem].difficulty}</span>
            <span>Type: {problems[currentProblem].type}</span>
          </div>
          <div className="flex items-center space-x-6 text-white/60">
            <span>⏱ 08:42 elapsed</span>
            <div className="flex items-center space-x-2">
              <Volume2 className="w-3 h-3" />
              <span>Voice enabled</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveCodeEditor;
