"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import AuthModal from "@/components/ui/auth-modal"

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  showAuthModal: (defaultTab?: "login" | "signup") => void
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

interface User {
  id: string
  name: string
  email: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login")

  const showAuthModal = (defaultTab: "login" | "signup" = "login") => {
    setAuthModalTab(defaultTab)
    setIsAuthModalOpen(true)
  }

  const login = async (email: string, password: string) => {
    // Mock login functionality
    setUser({
      id: "1",
      name: "Test User",
      email,
    })
    setIsAuthenticated(true)
    setIsAuthModalOpen(false)
  }

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup functionality
    setUser({
      id: "1",
      name,
      email,
    })
    setIsAuthenticated(true)
    setIsAuthModalOpen(false)
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        showAuthModal,
        login,
        signup,
        logout,
      }}
    >
      {children}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} defaultTab={authModalTab} />
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
