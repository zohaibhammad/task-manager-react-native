import { View, Text, Button, FlatList } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import {Task, useTaskRepository} from "@/repositories/TaskRepository";
import { useState, useCallback } from "react";

export default function HomeScreen() {
    const router = useRouter();
    const { getTasks } = useTaskRepository();
    const [tasks, setTasks] = useState<Task[]>([]);

    useFocusEffect(
        useCallback(() => {
            setTasks(getTasks());
        }, [getTasks])
    );

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Button title="Add Task" onPress={() => router.push("/task-form")} />
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text style={{ marginTop: 10 }}>{item.title}</Text>
                )}
            />
        </View>
    );
}
