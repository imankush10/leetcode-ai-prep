"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/lib/auth-context"
import { motion } from "framer-motion"

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)
  const { showAuthModal } = useAuth()

  const handleSubscribe = () => {
    showAuthModal("signup")
  }

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
      buttonVariant: "outline" as const,
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
      buttonVariant: "default" as const,
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
      buttonVariant: "outline" as const,
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Choose Your Plan
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Select the perfect plan to match your interview preparation needs
          </p>

          <motion.div
            className="mt-8 flex items-center justify-center space-x-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className={`text-sm ${!isYearly ? "text-white" : "text-gray-400"}`}>Monthly</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} className="data-[state=checked]:bg-purple-600" />
            <span className={`text-sm ${isYearly ? "text-white" : "text-gray-400"}`}>
              Yearly <span className="rounded-full bg-purple-600 px-2 py-0.5 text-xs font-medium">Save 20%+</span>
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`relative rounded-lg border ${
                tier.highlighted ? "border-purple-500 bg-gray-900" : "border-gray-800 bg-gray-900/50"
              } p-6 shadow-lg transition-all duration-300 hover:border-purple-500/50 hover:shadow-purple-500/10`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-purple-600 px-3 py-1 text-xs font-medium">
                  Most Popular
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold">${isYearly ? tier.yearlyPrice : tier.monthlyPrice}</span>
                  <span className="ml-1 text-gray-400">/{isYearly ? "year" : "month"}</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">{tier.description}</p>
              </div>

              <ul className="mb-6 space-y-3">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="mr-2 h-5 w-5 shrink-0 text-green-500" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.buttonVariant}
                className={`w-full ${
                  tier.highlighted
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white"
                }`}
                onClick={handleSubscribe}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 rounded-lg border border-gray-800 bg-gray-900/50 p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3 className="mb-2 text-xl font-bold">Not sure which plan is right for you?</h3>
          <p className="mb-4 text-gray-400">Try our free demo to experience the platform before making a decision.</p>
          <Button className="bg-purple-600 hover:bg-purple-700" asChild>
            <a href="/demo">Try Free Demo</a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
