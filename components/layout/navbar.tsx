"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RainbowButton from "../ui/RainbowButton";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="h-24">
      {" "}
      {/* This creates the top margin/spacing */}
      <nav className="fixed top-1 left-1/2 transform -translate-x-1/2 z-50 w-[90%] rounded-md">
        {/* Glassmorphism background with gradient blur */}
        <div className="absolute inset-0 backdrop-blur-md rounded-md"></div>

        <div className="relative flex h-20 items-center justify-between px-6">
          {/* Left side - Logo */}
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="rounded-md p-1.5">
                <Image src="/logo.png" width={52} height={52} alt="logo" />
              </div>
              <span className="text-xl font-bold text-white">OnLevel</span>
            </Link>
          </div>

          {/* Right side - Try Free Button (Desktop) */}
          <div className="hidden items-center md:flex">
            <RainbowButton href="https://onlevel-app.vercel.app/sign-in">Try Free</RainbowButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-r from-white/10 via-white/25 to-white/10 backdrop-blur-md rounded-2xl border border-white/10 md:hidden">
            <div className="px-6 py-4">
              <div className="flex flex-col space-y-4">
                <RainbowButton 
                  className="w-full" 
                  href="https://onlevel-app.vercel.app/sign-in"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Try Free
                </RainbowButton>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
