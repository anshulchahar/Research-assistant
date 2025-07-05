import AddTaskForm from "@/components/AddTaskForm";
import TaskList from "@/components/TaskList";

export default function Home() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <AddTaskForm />
      </div>
      <p className="mb-4">Welcome to your thesis research assistant. Track your tasks and manage your research here.</p>
      <TaskList />
    </div>
  );
}
