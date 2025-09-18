import { Stack } from "expo-router";
import { TaskRepositoryProvider } from "@/repositories/TaskRepositoryAPI";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
      <TaskRepositoryProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: "My Tasks" }} />
          <Stack.Screen name="add-task/index" />
        </Stack>
      </TaskRepositoryProvider>
  );
}
