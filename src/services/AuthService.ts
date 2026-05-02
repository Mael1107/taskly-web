import api from "@/lib/api"

interface AuthResponse {
    token: string
    user: {
        id: number
        name: string
        email: string
    }
}

interface RegisterData {
    name: string
    email: string
    password: string
}

interface LoginData {
    email: string
    password: string
}

export const register = async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post("/auth/register", data)
    localStorage.setItem("token", response.data.token)
    return response.data
}

export const login = async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", data)
    localStorage.setItem("token", response.data.token)
    return response.data
}

export const logout = () => {
    localStorage.removeItem("token")
}

export const getMe = async (): Promise<AuthResponse["user"]> => {
    const response = await api.get("/auth/me")
    return response.data
}

