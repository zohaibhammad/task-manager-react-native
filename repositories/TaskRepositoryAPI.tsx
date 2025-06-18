import React, { createContext, useContext, useState, useEffect } from "react";

export type Task = {
    id: string;
    title: string;
    completed: boolean;
};

type TaskContextType = {
    tasks: Task[];
    getTasks: () => Promise<void>;
    addTask: (task: Omit<Task, "id">) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    updateTask: (task: Task) => Promise<void>;
    toggleTaskCompleted: (id: string) => Promise<void>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/tasks`;

export const TaskRepositoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const getTasks = async () => {
        const res = await fetch(API_URL);
        const data = await res.json();
        setTasks(data);
    };

    const addTask = async (task: Omit<Task, "id">) => {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        const newTask = await res.json();
        setTasks((prev) => [...prev, newTask]);
    };

    const deleteTask = async (id: string) => {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    const updateTask = async (task: Task) => {
        const res = await fetch(`${API_URL}/${task.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        const updatedTask = await res.json();
        setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    };

    const toggleTaskCompleted = async (id: string) => {
        const task = tasks.find((t) => t.id === id);
        if (!task) return;
        await updateTask({ ...task, completed: !task.completed });
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <TaskContext value={{ tasks, getTasks, addTask, deleteTask, updateTask, toggleTaskCompleted }}>
            {children}
        </TaskContext>
    );
};

export const useTaskRepository = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("useTaskRepository must be used within a TaskRepositoryProvider");
    return context;
};
