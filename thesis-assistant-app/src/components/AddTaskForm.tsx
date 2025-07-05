'use client';

import React,
{
  useState
}
from 'react';
import {
  useTaskStore,
  TaskCategory
} from '@/store/taskStore';
import {
  Button
} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Input
} from '@/components/ui/input';
import {
  Label
} from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AddTaskForm = () => {
  const {
    addTask
  } = useTaskStore();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState < TaskCategory > ('General');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask(title, category);
    setTitle('');
    setCategory('General');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add New Task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Read chapter 3"
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value: TaskCategory) => setCategory(value)} defaultValue={category}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Reading">Reading</SelectItem>
                <SelectItem value="Writing">Writing</SelectItem>
                <SelectItem value="Testing">Testing</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Add Task</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskForm;
