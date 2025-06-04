import { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { useTaskRepository } from "@/repositories/TaskRepository";

export default function AddTaskScreen() {
    const [title, setTitle] = useState("");
    const { addTask } = useTaskRepository();
    const router = useRouter();

    const handleSubmit = () => {
        addTask({ id: Date.now(), title });
        router.back();
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <TextInput
                placeholder="Task title"
                value={title}
                onChangeText={setTitle}
                style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
            />
            <Button title="Save Task" onPress={handleSubmit} />
        </View>
    );
}
