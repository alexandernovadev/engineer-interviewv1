import { Task } from "../../hooks/useTasks/types";

export interface ColumnProps {
  title: string;
  tasks: Task[];
  onMoveTask: (taskId: string, direction: "left" | "right") => void;
}
