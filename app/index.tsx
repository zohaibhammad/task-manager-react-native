import { View, Text, Button, FlatList, TouchableOpacity, Pressable } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useTaskRepository } from "@/repositories/TaskRepositoryAPI";
import { useCallback } from "react";
import { Ionicons } from '@expo/vector-icons';

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
        <View style={{ flex: 1, padding: 20 }}>
            <Button title="Add Task" onPress={() => router.push("/add-task")} />
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                            <Pressable onPress={() => handleToggle(item.id)}>
                                <Ionicons
                                    name={item.completed ? 'checkbox' : 'square-outline'}
                                    size={24}
                                    color={item.completed ? 'green' : 'gray'}
                                />
                            </Pressable>
                            <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none', marginLeft: 10 }}>{item.title}</Text>
                        </View>
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
