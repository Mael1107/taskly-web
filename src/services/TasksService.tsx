import { User, AuthResponse, Task } from "@/types"
import api from "@/lib/api"

interface CreateTaskData {
    title: string
    description?: string
}

interface UpdateTaskData {
    title?: string
    description?: string
    completed?: boolean
}

export const getTasks = async (): Promise<Task[]> => {
    const response = await api.get("/tasks")
    return response.data
}

export const createTask = async (data: CreateTaskData): Promise<Task> => {
    const response = await api.post("/tasks", {task: data})
    return response.data
}

export const updateTask = async (id:number, data: UpdateTaskData): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, {task: data})
    return response.data
}

export const deleteTask = async (id: number) => await api.delete(`/tasks/${id}`)
