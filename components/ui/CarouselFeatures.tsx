import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Brain, Zap } from "lucide-react";
import InteractiveCodeEditor from "../features/InteractiveCodeEditor";
import LiveAnalysis from "../features/LiveAnalysis";
import InterviewRecording from "../features/InterviewRecording";

const CarouselFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [direction, setDirection] = useState(0);

  const features = [
    {
      icon: Code,
      label: "Interactive Coding",
      color: "text-emerald-400",
      component: <InteractiveCodeEditor />,
    },
    {
      icon: Brain,
      label: "Live Analysis",
      color: "text-purple-400",
      component: <LiveAnalysis />,
    },
    {
      icon: Zap,
      label: "Interview Recording",
      color: "text-amber-400",
      component: <InterviewRecording />,
    },
  ];

  const goToFeature = (index) => {
    setDirection(index > activeFeature ? 1 : -1);
    setActiveFeature(index);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-16">
      {/* Feature Buttons */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.button
              key={index}
              onClick={() => goToFeature(index)}
              className={`flex flex-col items-center space-y-3 p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                activeFeature === index
                  ? "shadow-lg"
                  : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <feature.icon
                className={`w-7 h-7 ${
                  activeFeature === index ? feature.color : "text-gray-600"
                } transition-colors duration-300`}
              />
              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  activeFeature === index ? "text-white" : "text-gray-500"
                }`}
              >
                {feature.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Content Display with Slide Animation */}
      <div className="relative overflow-hidden rounded-2xl shadow-lg scale-[0.93]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeFeature}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            {features[activeFeature].component}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CarouselFeatures;
