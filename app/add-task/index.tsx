import { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTaskRepository } from "@/repositories/TaskRepositoryAPI";

export default function AddTaskScreen() {
    const { id } = useLocalSearchParams<{ id?: string }>();
    const isEditing = Boolean(id);

    const { tasks, addTask, updateTask } = useTaskRepository();
    const taskToEdit = isEditing ? tasks.find((t) => t.id === id) : null;

    const [title, setTitle] = useState(taskToEdit?.title || "");
    const router = useRouter();

    const handleSubmit = () => {
        if (isEditing) {
            updateTask({ id: id!, title, completed: taskToEdit?.completed ?? false });
        } else {
            addTask({ title, completed: false });
        }
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
