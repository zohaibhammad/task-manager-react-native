import { Stack } from "expo-router";
import { TaskRepositoryProvider } from "../repositories/TaskRepository";

export default function Layout() {
  return (
      <TaskRepositoryProvider>
        <Stack />
      </TaskRepositoryProvider>
  );
}
