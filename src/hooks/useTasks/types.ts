export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'inProgress' | 'done';
}

export interface UseTasksReturn {
  tasks: Task[];
  addTask: (title: string) => void;
  moveTask: (taskId: string, direction: 'left' | 'right') => void;
} 