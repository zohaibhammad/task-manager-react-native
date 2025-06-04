import React, { createContext, useContext, useState } from "react";

export type Task = {
    id: number;
    title: string;
};

type TaskContextType = {
    tasks: Task[];
    getTasks: () => Task[];
    addTask: (task: Task) => void;
    deleteTask: (id: number) => void;
    updateTask: (task: Task) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskRepositoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const getTasks = () => tasks;
    const addTask = (task: Task) => setTasks((prev) => [...prev, task]);
    const deleteTask = (id: number) => setTasks((prev) => prev.filter((t) => t.id !== id));
    const updateTask = (updatedTask: Task) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
    };

    return (
        <TaskContext.Provider value={{ tasks, getTasks, addTask, deleteTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskRepository = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("useTaskRepository must be used within a TaskRepositoryProvider");
    return context;
};
