"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Mic,
  Code,
  Brain,
  Sparkles,
  Zap,
} from "lucide-react";
import RainbowButton from "../ui/RainbowButton";
import CarouselFeatures from "../ui/CarouselFeatures";

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


export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

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

      <div className="container relative z-10 mx-auto px-4 pt-4">
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
            <RainbowButton href="https://interviewprep-pink.vercel.app/sign-in" className="">
              Start Free Interview
            </RainbowButton>
          </motion.div>
          <CarouselFeatures/>
        </motion.div>
      </div>
    </section>
  );
}
