import { Task } from "../../hooks/useTasks/types";

export interface TodoItemProps {
  task: Task;
  onMoveLeft: () => void;
  onMoveRight: () => void;
}
