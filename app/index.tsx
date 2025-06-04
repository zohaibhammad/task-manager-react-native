import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Task, useTaskRepository } from "@/repositories/TaskRepository";
import { useState, useCallback } from "react";

export default function HomeScreen() {
    const router = useRouter();
    const { getTasks, deleteTask } = useTaskRepository();
    const [tasks, setTasks] = useState<Task[]>([]);

    useFocusEffect(
        useCallback(() => {
            setTasks(getTasks());
        }, [getTasks])
    );

    const handleDelete = (id: number) => {
        deleteTask(id);
        setTasks(getTasks());
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Button title="Add Task" onPress={() => router.push("/add-task")} />
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>{item.title}</Text>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <TouchableOpacity onPress={() => router.push({ pathname: "/add-task", params: { id: item.id.toString() } })}>
                                <Text style={{ color: 'blue' }}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                <Text style={{ color: 'red' }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}
