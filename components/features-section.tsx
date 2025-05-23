"use client";

import {
  Code,
  Layout,
  Database,
  Cpu,
  BarChart,
  Clock,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Code className="h-12 w-12" />,
      title: "LeetCode Mastery",
      description:
        "Practice with 2000+ real problems from FAANG interviews. Our AI adapts to your skill level and provides personalized learning paths.",
      gradient: "from-purple-500 via-violet-600 to-purple-700",
      accent: "purple",
      stats: "2000+ Problems",
      bgPattern: "code",
      highlight: "AI-Powered",
    },
    {
      icon: <Layout className="h-12 w-12" />,
      title: "System Design Pro",
      description:
        "Master scalable architectures with interactive whiteboards, real-world scenarios, and expert-level feedback systems.",
      gradient: "from-blue-500 via-cyan-600 to-blue-700",
      accent: "blue",
      stats: "50+ Scenarios",
      bgPattern: "system",
      highlight: "Interactive",
    },
    {
      icon: <Database className="h-12 w-12" />,
      title: "Database Wizard",
      description:
        "Optimize queries, design schemas, and master complex SQL with interactive challenges and performance analytics.",
      gradient: "from-green-500 via-emerald-600 to-green-700",
      accent: "green",
      stats: "300+ Queries",
      bgPattern: "database",
      highlight: "Performance",
    },
    {
      icon: <Cpu className="h-12 w-12" />,
      title: "Full-Stack Ready",
      description:
        "Frontend, backend, and everything in between. Comprehensive preparation for any role with specialized tracks.",
      gradient: "from-red-500 via-pink-600 to-red-700",
      accent: "red",
      stats: "Multi-Stack",
      bgPattern: "stack",
      highlight: "Complete",
    },
    {
      icon: <BarChart className="h-12 w-12" />,
      title: "AI Analytics",
      description:
        "Get detailed insights, weakness analysis, and personalized improvement recommendations powered by machine learning.",
      gradient: "from-yellow-500 via-orange-600 to-yellow-700",
      accent: "yellow",
      stats: "Smart Insights",
      bgPattern: "analytics",
      highlight: "ML-Driven",
    },
    {
      icon: <Clock className="h-12 w-12" />,
      title: "Real-Time Pressure",
      description:
        "Experience authentic interview pressure with timed challenges, live feedback, and stress simulation training.",
      gradient: "from-pink-500 via-rose-600 to-pink-700",
      accent: "pink",
      stats: "Live Timing",
      bgPattern: "clock",
      highlight: "Realistic",
    },
  ];

  const FeatureCard = ({ feature, index }) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [particles, setParticles] = useState([]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]));
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]));

    // Generate particles only on client side
    useEffect(() => {
      const generateParticles = () => {
        const particleArray = [];
        for (let i = 0; i < 8; i++) {
          particleArray.push({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 2,
            duration: 4 + Math.random() * 2,
          });
        }
        setParticles(particleArray);
      };

      generateParticles();
    }, []);

    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set((e.clientX - centerX) / rect.width);
      mouseY.set((e.clientY - centerY) / rect.height);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
      setIsHovered(false);
    };

    return (
      <motion.div
        ref={cardRef}
        className="relative group perspective-1000"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glowing background */}
        <motion.div
          className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-3xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
          animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <div className="relative h-full bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 overflow-hidden group-hover:border-gray-600/50 transition-all duration-300 shadow-2xl">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className={`w-full h-full bg-gradient-to-br ${feature.gradient}`}
            >
              <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <pattern
                    id={`pattern-${index}`}
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="1"
                      fill="currentColor"
                      opacity="0.1"
                    />
                  </pattern>
                </defs>
                <rect
                  width="100"
                  height="100"
                  fill={`url(#pattern-${index})`}
                />
              </svg>
            </div>
          </div>

          {/* Client-side only floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className={`absolute w-1 h-1 bg-gradient-to-r ${feature.gradient} rounded-full`}
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                }}
                animate={{
                  y: [-20, -60, -20],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                }}
              />
            ))}
          </div>

          {/* Rest of your card content */}
          <div className="relative z-10">
            {/* Your existing card content here */}
            <motion.div
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${feature.gradient} text-white mb-4 shadow-lg`}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {feature.highlight}
            </motion.div>

            <motion.div
              className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.gradient} p-4 mb-6 shadow-2xl relative overflow-hidden`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-2xl"
                animate={
                  isHovered
                    ? { scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }
                    : {}
                }
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className="text-white relative z-10"
                animate={isHovered ? { rotate: [0, 5, -5, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                {feature.icon}
              </motion.div>
            </motion.div>

            <motion.h3
              className="text-2xl font-bold mb-4 text-white"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              {feature.title}
            </motion.h3>

            <motion.p
              className="text-gray-300 leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              {feature.description}
            </motion.p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      id="features"
      className="relative py-32 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden"
    >
      {/* Your existing section content */}
      <div className="container relative mx-auto px-4">
        {/* Your existing header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Your existing header content */}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
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
