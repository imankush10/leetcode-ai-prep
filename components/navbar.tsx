"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import RainbowButton from "./RainbowButton"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="h-28"> {/* This creates the top margin/spacing */}
      <nav className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50 w-[90%] rounded-md">
        {/* Glassmorphism background with gradient blur */}
        <div className="absolute inset-0 backdrop-blur-md rounded-md"></div>
        
        <div className="relative flex h-24 items-center justify-between px-6">
          {/* Left side - Logo and Navigation Links */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="rounded-md bg-purple-600 p-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-white"
                >
                  <path d="M21 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
                  <path d="M10 2v4" />
                  <path d="M14 2v4" />
                  <path d="M10 16v6" />
                  <path d="M14 16v6" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">MockAI</span>
            </Link>

            {/* Navigation Links - Desktop */}
            <div className="hidden items-center space-x-6 md:flex">
              <Link href="/#features" className="text-sm text-white/80 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="/#pricing" className="text-sm text-white/80 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="/#testimonials" className="text-sm text-white/80 hover:text-white transition-colors">
                Testimonials
              </Link>
            </div>
          </div>

          {/* Right side - Sign Up and Demo Button */}
          <div className="hidden items-center space-x-4 md:flex">
            <Button 
              variant="ghost" 
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              Sign Up
            </Button>
            <RainbowButton>Start Interview</RainbowButton>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-r from-white/10 via-white/25 to-white/10 backdrop-blur-md rounded-2xl border border-white/10 md:hidden">
            <div className="px-6 py-4">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/#features"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="/#pricing"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/#testimonials"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testimonials
                </Link>
                <hr className="border-white/20" />
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Button>
                <RainbowButton className="w-full">Start Interview</RainbowButton>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}
