"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Code,
  Layout,
  Database,
  Cpu,
  BarChart,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";

function FloatingParticles() {
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    left: 10 + i * 15,
    top: 20 + (i % 2) * 30,
    delay: i * 0.8,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [-20, -40, -20],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function FeatureCard({ feature, index }) {
  const cardRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -50]);

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      style={{ y }}
    >
      <motion.div
        className="relative h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden"
        whileHover={{
          backgroundColor: "rgba(255, 255, 255, 0.06)",
          borderColor: "rgba(255, 255, 255, 0.2)",
          scale: 1.02,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Subtle gradient background */}
        <div className="absolute inset-0 opacity-20">
          <div className={`w-full h-full bg-gradient-to-br ${feature.gradient}`} />
        </div>

        {/* Floating elements for this card */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className={`absolute top-4 right-4 w-2 h-2 rounded-full ${feature.accentColor}`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.5,
            }}
          />
        </div>

        <div className="relative z-10">
          {/* Icon with subtle animation */}
          <motion.div
            className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${feature.iconBg} mb-6`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className={feature.iconColor}
              animate={{
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {feature.icon}
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-xl font-medium mb-3 text-white/90"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            {feature.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-white/60 text-sm leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            {feature.description}
          </motion.p>

          {/* Stats or highlight */}
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${feature.statsBg} ${feature.statsColor}`}>
              {feature.stats}
            </span>
            <motion.div
              className="text-white/40 group-hover:text-white/70 transition-colors"
              whileHover={{ x: 3 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 100]);

  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "LeetCode Mastery",
      description: "Practice with 2000+ real problems from FAANG interviews. Our AI adapts to your skill level and provides personalized learning paths.",
      gradient: "from-blue-500/20 to-purple-500/20",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      stats: "2000+ Problems",
      statsBg: "bg-blue-500/10",
      statsColor: "text-blue-400",
      accentColor: "bg-blue-400",
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: "System Design Pro",
      description: "Master scalable architectures with interactive whiteboards, real-world scenarios, and expert-level feedback systems.",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400",
      stats: "50+ Scenarios",
      statsBg: "bg-purple-500/10",
      statsColor: "text-purple-400",
      accentColor: "bg-purple-400",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Database Wizard",
      description: "Optimize queries, design schemas, and master complex SQL with interactive challenges and performance analytics.",
      gradient: "from-green-500/20 to-emerald-500/20",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-400",
      stats: "300+ Queries",
      statsBg: "bg-green-500/10",
      statsColor: "text-green-400",
      accentColor: "bg-green-400",
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Full-Stack Ready",
      description: "Frontend, backend, and everything in between. Comprehensive preparation for any role with specialized tracks.",
      gradient: "from-orange-500/20 to-red-500/20",
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-400",
      stats: "Multi-Stack",
      statsBg: "bg-orange-500/10",
      statsColor: "text-orange-400",
      accentColor: "bg-orange-400",
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "AI Analytics",
      description: "Get detailed insights, weakness analysis, and personalized improvement recommendations powered by machine learning.",
      gradient: "from-yellow-500/20 to-amber-500/20",
      iconBg: "bg-yellow-500/10",
      iconColor: "text-yellow-400",
      stats: "Smart Insights",
      statsBg: "bg-yellow-500/10",
      statsColor: "text-yellow-400",
      accentColor: "bg-yellow-400",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Real-Time Pressure",
      description: "Experience authentic interview pressure with timed challenges, live feedback, and stress simulation training.",
      gradient: "from-pink-500/20 to-rose-500/20",
      iconBg: "bg-pink-500/10",
      iconColor: "text-pink-400",
      stats: "Live Timing",
      statsBg: "bg-pink-500/10",
      statsColor: "text-pink-400",
      accentColor: "bg-pink-400",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative bg-black overflow-hidden"
    >
      {/* Subtle animated background */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{ y: backgroundY }}
      >
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </motion.div>

      {/* Floating particles */}
      <FloatingParticles />

      <div className="container relative z-10 mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Status badge */}
          <motion.div
            className="inline-flex items-center space-x-3 bg-white/[0.06] border border-white/10 rounded-full px-6 py-3 backdrop-blur-xl mb-8"
            whileHover={{
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              borderColor: "rgba(255, 255, 255, 0.2)",
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
            </motion.div>
            <span className="text-white/80 text-sm font-medium">
              Comprehensive Platform Features
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            className="text-4xl md:text-5xl font-medium text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              ace your interview
            </span>
          </motion.h2>

          <motion.p
            className="text-white/60 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From coding challenges to system design, our platform covers every aspect of technical interviews with AI-powered guidance.
          </motion.p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
