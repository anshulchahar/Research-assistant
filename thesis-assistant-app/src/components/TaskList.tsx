'use client';

import React from 'react';
import { useTaskStore } from '@/store/taskStore';
import TaskCard from './TaskCard';

const TaskList = () => {
  const { tasks } = useTaskStore();

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
