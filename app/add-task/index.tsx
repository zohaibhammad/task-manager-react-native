import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useTaskRepository } from "@/repositories/TaskRepositoryAPI";
import { styles } from "./styles";

export default function AddTaskScreen() {
    const { id } = useLocalSearchParams<{ id?: string }>();
    const isEditing = Boolean(id);

    const { tasks, addTask, updateTask } = useTaskRepository();
    const taskToEdit = isEditing ? tasks.find((t) => t.id === id) : null;

    const [title, setTitle] = useState(taskToEdit?.title || "");
    const [error, setError] = useState("");
    const router = useRouter();
    const isDisabled = !title.trim();

    const handleSubmit = () => {
        if (!title.trim()) {
            setError("Task title cannot be empty.");
            return;
        }
        if (isEditing) {
            updateTask({ id: id!, title: title.trim(), completed: taskToEdit?.completed ?? false });
        } else {
            addTask({ title: title.trim(), completed: false });
        }
        router.back();
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: isEditing ? "Edit Task" : "Add Task" }} />
            <TextInput
                placeholder="Task title"
                value={title}
                onChangeText={(text) => {
                    setTitle(text);
                    if (error) setError("");
                }}
                style={styles.input}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity
                style={[styles.saveButton, isDisabled && styles.saveButtonDisabled]}
                onPress={handleSubmit}
                disabled={isDisabled}
                activeOpacity={0.7}
            >
                <Text style={styles.saveButtonText}>Save Task</Text>
            </TouchableOpacity>
        </View>
    );
}
