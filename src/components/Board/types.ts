import { Task } from '../../hooks/useTasks/types';

export interface BoardProps {
  tasks: Task[];
  onMoveTask: (taskId: string, direction: 'left' | 'right') => void;
  onAddTask: (title: string) => void;
} 