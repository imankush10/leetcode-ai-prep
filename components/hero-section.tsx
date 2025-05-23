"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  Play,
  Mic,
  Code,
  Brain,
  Volume2,
  Sparkles,
  Zap,
  CheckCircle,
} from "lucide-react";
import RainbowButton from "./RainbowButton";

// Animated gradient background similar to Applied Labs
function AnimatedGradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -inset-10 opacity-50"
        animate={{
          background: [
            "radial-gradient(600px circle at 0% 0%, rgba(120, 119, 198, 0.3), transparent 50%)",
            "radial-gradient(600px circle at 100% 100%, rgba(120, 119, 198, 0.3), transparent 50%)",
            "radial-gradient(600px circle at 50% 50%, rgba(120, 119, 198, 0.3), transparent 50%)",
            "radial-gradient(600px circle at 0% 0%, rgba(120, 119, 198, 0.3), transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute -inset-10 opacity-30"
        animate={{
          background: [
            "radial-gradient(800px circle at 100% 0%, rgba(76, 29, 149, 0.4), transparent 50%)",
            "radial-gradient(800px circle at 0% 100%, rgba(76, 29, 149, 0.4), transparent 50%)",
            "radial-gradient(800px circle at 50% 0%, rgba(76, 29, 149, 0.4), transparent 50%)",
            "radial-gradient(800px circle at 100% 0%, rgba(76, 29, 149, 0.4), transparent 50%)",
          ],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

// Floating elements inspired by Framer's design
function FloatingElements() {
  const elements = [
    { icon: Code, color: "text-blue-400", delay: 0 },
    { icon: Brain, color: "text-purple-400", delay: 2 },
    { icon: Mic, color: "text-green-400", delay: 4 },
    { icon: Sparkles, color: "text-yellow-400", delay: 6 },
    { icon: Zap, color: "text-pink-400", delay: 8 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.color} opacity-20`}
          style={{
            left: `${10 + index * 20}%`,
            top: `${15 + index * 15}%`,
          }}
          animate={{
            y: [-30, -60, -30],
            x: [-10, 10, -10],
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 15 + index * 2,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        >
          <element.icon className="w-8 h-8" />
        </motion.div>
      ))}
    </div>
  );
}

// Enhanced code editor with Applied Labs styling
function EnhancedCodeEditor() {
  const [currentTab, setCurrentTab] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState([]);

  const tabs = ["solution.py", "test.py", "analysis.md"];
  const codeContent = [
    `def two_sum(nums, target):
    """
    Find two numbers that add up to target.
    Time: O(n), Space: O(n)
    """
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
    assert two_sum([3, 3], 6) == [0, 1]
    
# All tests passed ✓`,
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
  ];

  const feedbackItems = [
    {
      type: "success",
      message: "Excellent time complexity optimization",
      icon: CheckCircle,
    },
    { type: "info", message: "Consider edge case: empty array", icon: Brain },
    {
      type: "suggestion",
      message: "Explain your approach step by step",
      icon: Mic,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProcessing(true);
      setTimeout(() => {
        setFeedback(feedbackItems);
        setIsProcessing(false);
      }, 2000);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="relative max-w-6xl mx-auto bg-gray-950/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
    >
      {/* Enhanced header with Applied Labs styling */}
      <div className="flex items-center justify-between border-b border-white/10 p-6 bg-black/20">
        <div className="flex items-center space-x-6">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          <div className="flex space-x-1 bg-white/5 rounded-lg p-1">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setCurrentTab(index)}
                className={`px-4 py-2 text-sm rounded-md transition-all duration-200 ${
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

        {/* AI Status Indicator */}
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
          <div
            className={`w-2 h-2 rounded-full ${
              isProcessing ? "bg-blue-400 animate-pulse" : "bg-green-400"
            }`}
          />
        </motion.div>
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[400px]">
        {/* Code editor */}
        <div className="lg:col-span-3 p-8 font-mono text-sm bg-gradient-to-br from-gray-950/40 to-gray-900/40">
          <div className="flex items-center justify-between mb-4">
            <div className="text-white/40 text-xs">
              Lines: 1-{codeContent[currentTab].split("\n").length}
            </div>
            <div className="flex items-center space-x-2 text-xs text-white/40">
              <span>Python 3.11</span>
              <div className="w-1 h-1 bg-white/40 rounded-full"></div>
              <span>UTF-8</span>
            </div>
          </div>

          <motion.pre
            key={currentTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-white/90 leading-relaxed overflow-x-auto"
          >
            <code className="text-sm">{codeContent[currentTab]}</code>
          </motion.pre>

          <motion.div
            className="inline-block w-2 h-5 bg-blue-400 ml-1 mt-2"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        </div>

        {/* AI Feedback Panel */}
        <div className="lg:col-span-2 border-l border-white/10 bg-black/30 p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-white/90 font-semibold">AI Feedback</h4>
            <motion.div
              className="flex items-center space-x-2 text-xs text-white/60"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Mic className="w-3 h-3" />
              <span>Listening</span>
            </motion.div>
          </div>

          <div className="space-y-4">
            {feedback.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: index * 0.5, duration: 0.6 }}
                className={`p-4 rounded-xl border-l-2 ${
                  item.type === "success"
                    ? "bg-green-500/10 border-green-500/50 text-green-300"
                    : item.type === "info"
                    ? "bg-blue-500/10 border-blue-500/50 text-blue-300"
                    : "bg-yellow-500/10 border-yellow-500/50 text-yellow-300"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <item.icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p className="text-sm leading-relaxed">{item.message}</p>
                </div>
              </motion.div>
            ))}

            {feedback.length === 0 && !isProcessing && (
              <div className="text-center py-8 text-white/40">
                <Brain className="w-8 h-8 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Start coding to receive AI feedback</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced status bar */}
      <div className="border-t border-white/10 px-6 py-4 bg-black/40 backdrop-blur-sm">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-6 text-white/60">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Interview Active</span>
            </div>
            <span>Question 2 of 5 • Two Sum Problem</span>
            <span>Difficulty: Medium</span>
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
}

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-black"
    >
      {/* Enhanced background with Applied Labs inspiration */}
      <AnimatedGradientBackground />
      <FloatingElements />

      <motion.div className="absolute inset-0 opacity-[0.03]" style={{ y }}>
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-4 pt-4 pb-20">
        {/* Enhanced status badge */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-flex items-center space-x-4 bg-white/[0.08] border border-white/20 rounded-full px-6 py-3 backdrop-blur-xl"
            whileHover={{
              scale: 1.05,
              borderColor: "rgba(255, 255, 255, 0.4)",
              backgroundColor: "rgba(255, 255, 255, 0.12)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
              </motion.div>
              <Brain className="w-4 h-4 text-purple-400" />
              <Mic className="w-4 h-4 text-green-400" />
            </div>
            <div className="h-4 w-px bg-white/20"></div>
            <span className="text-white/90 text-sm font-medium tracking-wide">
              AI-Powered Interview Platform
            </span>
          </motion.div>
        </motion.div>

        {/* Enhanced main headline */}
        <motion.div className="text-center mb-20">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <h1 className="font-supreme">
              <motion.span
                className="block text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                style={{
                  fontSize: "64px",
                  lineHeight: "64px",
                  fontWeight: 500,
                  color: "rgb(250, 250, 250)",
                }}
              >
                The complete platform for
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                style={{
                  fontSize: "64px",
                  lineHeight: "64px",
                  fontWeight: 500,
                }}
              >
                AI-powered tech interviews
              </motion.span>
            </h1>

            <motion.p
              className="text-white/70 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              style={{
                fontSize: "18px",
                lineHeight: "32px",
                fontWeight: 400,
                color: "rgb(180, 180, 180)",
              }}
            >
              Practice coding interviews with an AI that speaks, thinks, and
              evaluates like real FAANG interviewers. <br />
              Full-featured code editor, real-time voice feedback, and
              personalized improvement suggestions.
            </motion.p>
          </motion.div>

          {/* Enhanced CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group"
          >
            <RainbowButton href="/" className="">
              Start Interview
            </RainbowButton>
          </motion.div>
        </motion.div>

        {/* Enhanced feature highlights */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Code,
                label: "Full IDE Experience",
                color: "text-blue-400",
              },
              {
                icon: Mic,
                label: "Voice Interaction",
                color: "text-green-400",
              },
              { icon: Brain, label: "AI Analysis", color: "text-purple-400" },
              {
                icon: Zap,
                label: "Instant Feedback",
                color: "text-yellow-400",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.06] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.7 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
                <span className="text-white/80 text-sm font-medium">
                  {feature.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced code editor */}
        <EnhancedCodeEditor />
      </div>
    </section>
  );
}
