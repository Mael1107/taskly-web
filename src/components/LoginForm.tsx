"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"
import { useRouter } from "next/navigation"

const LoginForm = () => {
    const router = useRouter()
    const { handleLogin } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()

        if (email.trim() === "" || !email.includes("@") || password.trim() === "" || password.length < 6) {
            setError("Email or password invalids! Try Again.")
            return
        }

        try {
            await handleLogin(email, password)
            router.push("/")
        } catch {
            setError("Error creating account! Try again.")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter here your email..."
            />
            <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter here your password..."
            />
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm