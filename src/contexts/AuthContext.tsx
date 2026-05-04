"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { login, register, logout, getMe } from "../services/AuthService"

import { User, AuthResponse } from "@/types"

interface AuthContextType {
    user: User | null
    loading: boolean
    handleLogin: (email: string, password: string) => Promise<void>
    handleRegister: (name: string, email: string, password: string) => Promise<void>
    handleLogout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const handleRegister = async (name: string, email: string, password: string) => {
        const response = await register({name, email, password})
        setUser(response.user)
    }

    const handleLogin = async (email: string, password: string) => {
        const response = await login({email, password})
        setUser(response.user)
    }

    const handleLogout = () => {
        logout()
        setUser(null)
    }
    
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("token") 

            if (token) {
                try {
                    const user = await getMe()
                    setUser(user)
                } catch {
                    localStorage.removeItem("token")
                }
            }
            setLoading(false)
        }
        loadUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, handleLogin, handleRegister, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}