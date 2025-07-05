import React from 'react';
import { Task, useTaskStore } from '@/store/taskStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { toggleTask, removeTask } = useTaskStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {task.title}
          <Button variant="ghost" size="icon" onClick={() => removeTask(task.id)}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Checkbox
            id={`task-${task.id}`}
            checked={task.completed}
            onCheckedChange={() => toggleTask(task.id)}
          />
          <label
            htmlFor={`task-${task.id}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {task.completed ? 'Completed' : 'Mark as complete'}
          </label>
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          Category: {task.category}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
