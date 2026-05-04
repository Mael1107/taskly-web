"use client"
import { Task } from "@/types"
import { useState } from "react"
import { updateTask, deleteTask } from "@/services/TasksService"

const TaskCard = ({task, onUpdate}: {task: Task, onUpdate: () => void}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(task.title)
    const [editDescription, setEditDescription] = useState(task.description)
    
    const handleEdit = async() => {
        await updateTask(task.id, {
            title: editTitle,
            description: editDescription
        })
        setIsEditing(false)
        onUpdate()
    }

    const handleToggleCompleted = async () => {
        await updateTask(task.id, {
            completed: !task.completed
        })
        onUpdate()
    }

    const handleDelete = async () => {
        await deleteTask(task.id)
        onUpdate()
    }

    if (!isEditing) return (
        <li>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <button onClick={() => setIsEditing(true)}>
                Edit
            </button>
            <button onClick={handleDelete}>
                Delete
            </button>
            <button onClick={handleToggleCompleted}>
                {task.completed ? "Uncheck" : "Check"}
            </button>
        </li>
    )

    return (
        <li>
            <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
            />
            <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
            />
            <button onClick={handleEdit}>Salvar</button>
            <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </li>
    )
}

export default TaskCard