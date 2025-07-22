import { useState } from 'react';
import { Task, UseTasksReturn } from './types';

const initialTasks: Task[] = [
  { id: '1', title: 'Learn JavaScript', status: 'todo' },
  { id: '2', title: 'Master React', status: 'inProgress' },
  { id: '3', title: 'Study TypeScript', status: 'done' },
];

export const useTasks = (): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (title: string) => {
    if (title.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: title.trim(),
        status: 'todo',
      };
      setTasks(prev => [...prev, newTask]);
    }
  };

  const moveTask = (taskId: string, direction: 'left' | 'right') => {
    setTasks(prev => 
      prev.map(task => {
        if (task.id !== taskId) return task;
        
        const statusMap = {
          todo: { left: 'todo', right: 'inProgress' },
          inProgress: { left: 'todo', right: 'done' },
          done: { left: 'inProgress', right: 'done' },
        };
        
        const newStatus = statusMap[task.status][direction] as Task['status'];
        return { ...task, status: newStatus };
      })
    );
  };

  return { tasks, addTask, moveTask };
}; 