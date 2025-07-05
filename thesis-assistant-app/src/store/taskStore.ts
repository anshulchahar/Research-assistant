import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TaskCategory = "Reading" | "Writing" | "Testing" | "General";

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  completed: boolean;
  createdAt: Date;
}

interface TaskState {
  tasks: Task[];
  addTask: (title: string, category: TaskCategory) => void;
  editTask: (id: string, title: string, category: TaskCategory) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (title, category) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: crypto.randomUUID(),
              title,
              category,
              completed: false,
              createdAt: new Date(),
            },
          ],
        })),
      editTask: (id, title, category) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, title, category } : task
          ),
        })),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
    }),
    {
      name: 'task-storage', // name of the item in the storage (must be unique)
    }
  )
);
