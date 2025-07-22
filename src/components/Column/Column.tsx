import React from "react";
import { ColumnProps } from "./types";
import { TodoItem } from "../TodoItem/TodoItem";
import "./Column.css";

export const Column: React.FC<ColumnProps> = ({ title, tasks, onMoveTask }) => {
  return (
    <div className="column">
      <h3 className="column__title">{title}</h3>
      <div className="column__content">
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onMoveLeft={() => onMoveTask(task.id, "left")}
            onMoveRight={() => onMoveTask(task.id, "right")}
          />
        ))}
      </div>
    </div>
  );
};
