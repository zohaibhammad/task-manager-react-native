import { View, Text, Button, FlatList } from "react-native";
import { useRouter } from "expo-router";
import {Task, useTaskRepository} from "@/repositories/TaskRepository";
import { useEffect, useState } from "react";

export default function HomeScreen() {
    const router = useRouter();
    const { getTasks } = useTaskRepository();
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        setTasks(getTasks());
        console.log("Hello")
    }, []);

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
