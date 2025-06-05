# 📱 React Native Task Manager

A simple yet polished task management app built with **Expo**, **TypeScript**, and **React Native**. Users can add, edit, complete, and delete tasks in a clean and user-friendly interface.

---

## 🚀 Getting Started

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v18 or above recommended)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

Install Expo CLI globally if not already:

```bash
npm install -g expo-cli
```

---

### 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/zohaibhammad/task-manager-react-native.git
cd task-manager-react-native
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn start
```

Or open with Expo Go app by scanning the QR code.

---



## 🧪 Running Tests

Unit tests are written using **Jest** and **React Native Testing Library**.

```bash
yarn test
```

For watch mode:

```bash
yarn test --watchAll
```

---

## Using json-server (Optional Backend)

You can optionally use [json-server](https://github.com/typicode/json-server) to simulate a REST API backend for the tasks. This is useful for development if you want to persist tasks beyond the in-memory store.

### Setup json-server

1. Install json-server globally or as a dev dependency:

```bash
npm install -g json-server
# or
yarn add --dev json-server
```

2. Create a `db.json` file in your project root with initial data:

```json
{
  "tasks": []
}
```

3. Start the json-server:

```bash
json-server --watch db.json --port 3000
```

This will run a REST API at `http://localhost:3000/tasks` with full CRUD support.

### Connecting Your App

- Use standard REST methods:
   - GET `/tasks` — get all tasks
   - POST `/tasks` — add new task
   - PUT `/tasks/:id` — update a task
   - DELETE `/tasks/:id` — delete a task

### Notes

- Make sure to run the server before launching your app if you want to use the backend.
- This setup helps you simulate a backend during development without building a full server.

---

## 🧠 Design Decisions

### 🔹 Tech Stack

- **Expo**: Streamlines the React Native dev workflow.
- **TypeScript**: For type safety and better DX.
- **Expo Router**: Enables file-based routing like Next.js.
- **React Context + Custom Hook**: `useTaskRepository` provides a clean and testable abstraction for managing task data.

---

### 🔹 App Architecture

```
task-manager/
├── app/
│   ├── index.tsx             # Home screen (task list)
│   ├── add-task/
│   │       └── styles.tsx    # Add Task Screen styles
│   │       └── index.tsx     # Add/edit task screen
│   │       └── __tests__/    # Unit tests
│   ├── _layout.tsx           # Shared layout with provider
│   ├── __tests__/            # Unit tests
│   ├── styles.ts             # Home Screen styles
├── repositories/
│           └── TaskRepositoryAPI.tsx
```

---

### 🔹 Styling

- Consistent use of `StyleSheet.create()` for performance and reusability.
- Buttons and inputs styled for accessibility and visual clarity.
- Disabled states and error states clearly indicated.

---

### 🔹 Testing Strategy

- **Unit tests**: Focused on behavior (e.g. task addition, navigation).
- **React Native Testing Library** used for component rendering and interaction simulation.

---

## ✨ Features

- Add new tasks
- Edit existing tasks
- Toggle completion
- Delete tasks
- Form validation and disabled state handling
- Optimistic UI update pattern

---

## 📂 Future Improvements

- Offline sync with local DB
- Push notifications
- Authentication and user-specific task lists

---

## 📄 License

MIT License © 2025 Zohaib Hammad
