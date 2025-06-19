"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Code, Layout, ArrowRight } from "lucide-react"
import Navbar from "@/components/layout/navbar"
import { motion } from "framer-motion"

export default function DemoPage() {
  const [selectedInterview, setSelectedInterview] = useState<string | null>(null)

  const interviewTypes = [
    {
      id: "leetcode",
      title: "LeetCode Interview",
      icon: <Code className="h-12 w-12 text-purple-500" />,
      description: "Practice coding problems similar to those asked in technical interviews at top tech companies.",
      examples: ["Two Sum", "Merge Intervals", "LRU Cache"],
    },
    {
      id: "system-design",
      title: "System Design Interview",
      icon: <Layout className="h-12 w-12 text-blue-500" />,
      description: "Design scalable systems and discuss architectural decisions for complex applications.",
      examples: ["URL Shortener", "Social Media Feed", "E-commerce Platform"],
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Link href="/" className="mb-8 inline-flex items-center text-sm text-gray-400 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Try a Free Mock Interview
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-gray-400">
            Experience our AI-powered mock interviews before subscribing. Choose an interview type to get started.
          </p>
        </motion.div>

        <motion.div className="grid gap-8 md:grid-cols-2" variants={container} initial="hidden" animate="show">
          {interviewTypes.map((type) => (
            <motion.div key={type.id} variants={item}>
              <Card
                className={`cursor-pointer border ${
                  selectedInterview === type.id ? "border-purple-500 bg-gray-900" : "border-gray-800 bg-gray-900/50"
                } transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10`}
                onClick={() => setSelectedInterview(type.id)}
              >
                <CardHeader>
                  <motion.div
                    className="mb-4"
                    whilehover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {type.icon}
                  </motion.div>
                  <CardTitle>{type.title}</CardTitle>
                  <CardDescription className="text-gray-400">{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md bg-gray-800 p-4">
                    <h4 className="mb-2 text-sm font-medium">Example Problems:</h4>
                    <ul className="space-y-1 text-sm text-gray-400">
                      {type.examples.map((example, index) => (
                        <li key={index} className="flex items-center">
                          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={selectedInterview === type.id ? "default" : "outline"}
                    className={`w-full ${
                      selectedInterview === type.id
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white"
                    }`}
                    onClick={() => setSelectedInterview(type.id)}
                  >
                    Select
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700"
            disabled={!selectedInterview}
            whilehover={{ scale: 1.05 }}
            whiletap={{ scale: 0.95 }}
          >
            Start Interview
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          {!selectedInterview && (
            <p className="mt-2 text-sm text-gray-400">Please select an interview type to continue</p>
          )}
        </motion.div>

        <motion.div
          className="mt-16 rounded-lg border border-gray-800 bg-gray-900/50 p-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <h2 className="mb-4 text-xl font-bold">What to Expect in the Demo</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div className="rounded-md bg-gray-800/50 p-4" whilehover={{ y: -5, transition: { duration: 0.2 } }}>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/20 text-purple-500">
                1
              </div>
              <h3 className="mb-2 text-lg font-medium">Interview Setup</h3>
              <p className="text-sm text-gray-400">
                You'll be presented with a problem statement and requirements for your solution.
              </p>
            </motion.div>
            <motion.div className="rounded-md bg-gray-800/50 p-4" whilehover={{ y: -5, transition: { duration: 0.2 } }}>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/20 text-purple-500">
                2
              </div>
              <h3 className="mb-2 text-lg font-medium">Interactive Session</h3>
              <p className="text-sm text-gray-400">
                Engage in a conversation with our AI interviewer as you work through the problem.
              </p>
            </motion.div>
            <motion.div className="rounded-md bg-gray-800/50 p-4" whilehover={{ y: -5, transition: { duration: 0.2 } }}>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/20 text-purple-500">
                3
              </div>
              <h3 className="mb-2 text-lg font-medium">Feedback & Analysis</h3>
              <p className="text-sm text-gray-400">
                Receive instant feedback on your approach, solution, and communication skills.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
