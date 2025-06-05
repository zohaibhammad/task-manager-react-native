import { View, Text, FlatList, TouchableOpacity, Pressable } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useTaskRepository } from "@/repositories/TaskRepositoryAPI";
import { useCallback } from "react";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "./styles";

export default function HomeScreen() {
    const router = useRouter();
    const { tasks, getTasks, deleteTask, toggleTaskCompleted } = useTaskRepository();

    useFocusEffect(
        useCallback(() => {
            getTasks();
        }, [getTasks])
    );

    const handleDelete = async (id: string) => {
        await deleteTask(id);
    };

    const handleToggle = async (id: string) => {
        await toggleTaskCompleted(id);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push("/add-task")}>
                <Text style={styles.addButtonText}>+ Add Task</Text>
            </TouchableOpacity>

            {tasks.length === 0 ? (
                <Text style={styles.emptyText}>No tasks found. Add your first one!</Text>
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.taskCard}>
                            <View style={styles.taskLeft}>
                                <Pressable onPress={() => handleToggle(item.id)}>
                                    <Ionicons
                                        name={item.completed ? 'checkbox' : 'square-outline'}
                                        size={24}
                                        color={item.completed ? '#4CAF50' : '#999'}
                                    />
                                </Pressable>
                                <Text
                                    style={[styles.taskText, item.completed && styles.taskCompleted]}
                                >
                                    {item.title}
                                </Text>
                            </View>
                            <View style={styles.taskActions}>
                                <TouchableOpacity style={styles.editButton} onPress={() => router.push({ pathname: "/add-task", params: { id: item.id.toString() } })}>
                                    <Text style={styles.buttonText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                                    <Text style={styles.buttonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
}
