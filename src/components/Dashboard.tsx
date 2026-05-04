"use client"
import { getTasks, createTask } from "@/services/TasksService"
import { useAuth } from "@/contexts/AuthContext"
import { useEffect, useState } from "react"
import { Task } from "@/types"
import TaskCard from "../components/TaskCard"

const Dashboard = () => {
  const { user, handleLogout } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTitle, setNewTitle] = useState("")

  const loadTasks = async () => {
    try {
      const tasks = await getTasks()
      setTasks(tasks)
    } catch {
      console.error("Loading tasks error!")
    }
  }

  const handleCreateTask = async (e: React.SubmitEvent) => {
    e.preventDefault()
    if (newTitle.trim() === "") return
    try {
      await createTask({ title: newTitle })
      setNewTitle("")
      loadTasks()
    } catch {
      console.error("Create task error!")
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <main>
      <h1>Olá, {user?.name}</h1>

      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Nova task..."
        />
        <button type="submit">Criar</button>
      </form>

      <ul>
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={loadTasks}
          />
        ))}
      </ul>

      <button onClick={handleLogout}>
        logout
      </button>
    </main>
  )
}

export default Dashboard