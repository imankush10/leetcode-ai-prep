"use client";

import { useState } from "react";
import { Check, Sparkles, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { motion } from "framer-motion";

function FloatingPricingElements() {
  const elements = [
    { left: "10%", top: "20%", delay: 0 },
    { left: "85%", top: "15%", delay: 2 },
    { left: "15%", top: "70%", delay: 4 },
    { left: "90%", top: "80%", delay: 6 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
          style={{
            left: element.left,
            top: element.top,
          }}
          animate={{
            y: [-10, -20, -10],
            opacity: [0.3, 0.7, 0.3],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  const tiers = [
    {
      name: "Starter",
      monthlyPrice: 25,
      yearlyPrice: 19,
      description: "Perfect for beginners preparing for their first interviews",
      features: [
        "15 LeetCode interviews per month",
        "2 System Design interviews",
        "Company-specific questions",
        "Basic performance analytics",
        "Email support",
      ],
      highlighted: false,
      gradient: "from-blue-500/10 to-purple-500/10",
      iconColor: "text-blue-400",
      borderColor: "border-blue-500/20",
      hoverBorder: "hover:border-blue-500/40",
    },
    {
      name: "Professional",
      monthlyPrice: 39,
      yearlyPrice: 29,
      description: "Ideal for active job seekers targeting multiple roles",
      features: [
        "20 LeetCode interviews per month",
        "15 System Design interviews",
        "5 Frontend interviews",
        "5 Backend interviews",
        "Advanced performance analytics",
        "Priority email support",
      ],
      highlighted: true,
      gradient: "from-purple-500/10 to-pink-500/10",
      iconColor: "text-purple-400",
      borderColor: "border-purple-500/30",
      hoverBorder: "hover:border-purple-500/50",
    },
    {
      name: "Expert",
      monthlyPrice: 59,
      yearlyPrice: 49,
      description: "Comprehensive preparation for senior positions",
      features: [
        "30 LeetCode interviews per month",
        "30 System Design interviews",
        "10 Frontend interviews",
        "10 Backend interviews",
        "10 SQL Database interviews",
        "Premium performance analytics",
        "Priority support with interview tips",
        "Mock interviews with personalized feedback",
      ],
      highlighted: false,
      gradient: "from-green-500/10 to-emerald-500/10",
      iconColor: "text-green-400",
      borderColor: "border-green-500/20",
      hoverBorder: "hover:border-green-500/40",
    },
  ];

  return (
    <section id="pricing" className="relative py-4 bg-black overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* Floating elements */}
      <FloatingPricingElements />

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
              <Star className="w-4 h-4 text-purple-400" />
            </motion.div>
            <span className="text-white/80 text-sm font-medium">
              Flexible Pricing Plans
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            className="text-4xl md:text-5xl font-medium text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Choose your{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              interview journey
            </span>
          </motion.h2>

          <motion.p
            className="text-white/60 text-lg max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Select the perfect plan to match your interview preparation needs
            and career goals
          </motion.p>

          {/* Pricing toggle */}
          <motion.div
            className="flex items-center justify-center space-x-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <span
              className={`text-sm font-medium ${
                !isYearly ? "text-white" : "text-white/60"
              }`}
            >
              Monthly
            </span>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-purple-500"
              />
            </motion.div>
            <span
              className={`text-sm font-medium ${
                isYearly ? "text-white" : "text-white/60"
              }`}
            >
              Yearly
            </span>
            <motion.span
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium px-3 py-1 rounded-full"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Save 20%+
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              className="relative group h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <motion.div
                className={`relative h-full bg-white/[0.03] backdrop-blur-xl border ${tier.borderColor} ${tier.hoverBorder} rounded-2xl p-8 overflow-hidden flex flex-col`}
                whileHover={{
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  scale: 1.02,
                  y: -5,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Popular badge */}
                {tier.highlighted && (
                  <motion.div
                    className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium px-4 py-2 rounded-full"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Most Popular
                  </motion.div>
                )}

                {/* Gradient background */}
                <div className="absolute inset-0 opacity-20">
                  <div
                    className={`w-full h-full bg-gradient-to-br ${tier.gradient}`}
                  />
                </div>

                {/* Floating accent */}
                <div className="absolute top-6 right-6">
                  <motion.div
                    className={`w-2 h-2 rounded-full bg-current ${tier.iconColor}`}
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

                <div className="relative z-10 flex flex-col h-full">
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-xl font-medium text-white/90 mb-2">
                      {tier.name}
                    </h3>
                    <div className="flex items-baseline mb-3">
                      <span className="text-4xl font-medium text-white">
                        ${isYearly ? tier.yearlyPrice : tier.monthlyPrice}
                      </span>
                      <span className="ml-2 text-white/60 text-sm">
                        /{isYearly ? "year" : "month"}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  {/* Features - flex-grow to push button to bottom */}
                  <div className="flex-grow">
                    <ul className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: index * 0.1 + featureIndex * 0.05,
                          }}
                        >
                          <Check className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-white/70 text-sm leading-relaxed">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Button - always at bottom */}
                  <motion.div
                    className="mt-8"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                        tier.highlighted
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                          : "bg-white/[0.08] hover:bg-white/[0.12] text-white border border-white/20 hover:border-white/40"
                      }`}
                    >
                      Get Started
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Free demo section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto"
            whileHover={{
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              borderColor: "rgba(255, 255, 255, 0.2)",
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 mb-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 text-blue-400" />
            </motion.div>
            <h3 className="text-xl font-medium text-white/90 mb-3">
              Not sure which plan is right for you?
            </h3>
            <p className="text-white/60 text-sm mb-6 leading-relaxed">
              Try our free demo to experience the platform before making a
              decision. No credit card required.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl font-medium"
                asChild
              >
                <a href="/demo">Try Free Demo</a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
