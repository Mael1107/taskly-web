"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"
import { useRouter } from "next/navigation"

const RegisterForm = () => {
    const router = useRouter()
    const { handleRegister } = useAuth()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()

        if (name.trim() === "") {
            setError("It cannot be empty! Please fill in correctly and try again.")
            return
        }

        if (email.trim() === "" || !email.includes("@")) {
            setError("It cannot be empty and needs to have @! Please fill in correctly and try again.")
            return
        }

        if (password.trim() === "" || password.length < 6) {
            setError("It cannot be empty and must be 6 characteres long! Please fill in correctly and try again.")
            return
        }

        try {
            await handleRegister(name, email, password)
            router.push("/dashboard")
        } catch {
            setError("Error creating account! Try again.")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}

            <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter here your name user..."
            />
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
            <button type="submit">Create Account</button>
        </form>
    )
}

export default RegisterForm