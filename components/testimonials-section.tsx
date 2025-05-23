"use client"

import { motion } from "framer-motion"

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "MockAI helped me prepare for my Google interview. The LeetCode practice with company-specific questions was incredibly valuable.",
      author: "Alex Chen",
      role: "Software Engineer at Google",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      quote:
        "The system design interviews were spot on. I felt so much more confident going into my actual interviews after practicing with MockAI.",
      author: "Sarah Johnson",
      role: "Senior Backend Developer at Amazon",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      quote:
        "As someone transitioning into tech, MockAI's structured approach to interview prep was exactly what I needed. I landed my dream job!",
      author: "Michael Rodriguez",
      role: "Frontend Engineer at Meta",
      avatar: "/placeholder.svg?height=50&width=50",
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
    <section id="testimonials" className="py-20 bg-gray-950">
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
              Success Stories
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            See how MockAI has helped candidates land their dream jobs at top tech companies
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <motion.div
                className="mb-4 text-purple-400"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </motion.div>
              <p className="mb-4 text-gray-300">{testimonial.quote}</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  className="mr-3 h-10 w-10 rounded-full"
                />
                <div>
                  <h4 className="font-medium">{testimonial.author}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
