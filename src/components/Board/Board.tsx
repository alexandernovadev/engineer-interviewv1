import React from "react";
import { BoardProps } from "./types";
import { Column } from "../Column/Column";
import { NewTaskForm } from "../NewTaskForm/NewTaskForm";
import { Task } from "../../hooks/useTasks/types";
import "./Board.css";

export const Board: React.FC<BoardProps> = ({
  tasks,
  onMoveTask,
  onAddTask,
}) => {
  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="board">
      <div className="board__columns">
        <Column
          title="To Do"
          tasks={getTasksByStatus("todo")}
          onMoveTask={onMoveTask}
        />
        <Column
          title="In Progress"
          tasks={getTasksByStatus("inProgress")}
          onMoveTask={onMoveTask}
        />
        <Column
          title="Done"
          tasks={getTasksByStatus("done")}
          onMoveTask={onMoveTask}
        />
      </div>

      <NewTaskForm onAddTask={onAddTask} />
    </div>
  );
};
