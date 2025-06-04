import { Stack } from "expo-router";
import { TaskRepositoryProvider } from "@/repositories/TaskRepositoryAPI";

export default function RootLayout() {
  return (
      <TaskRepositoryProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: "My Tasks" }} />
          <Stack.Screen name="add-task/index" options={{ title: "Add New Task" }} />
        </Stack>
      </TaskRepositoryProvider>
  );
}
