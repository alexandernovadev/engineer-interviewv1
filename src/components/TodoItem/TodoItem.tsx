import React from "react";
import { TodoItemProps } from "./types";
import "./TodoItem.css";

export const TodoItem: React.FC<TodoItemProps> = ({
  task,
  onMoveLeft,
  onMoveRight,
}) => {
  const isLeftDisabled = task.status === "todo";
  const isRightDisabled = task.status === "done";

  return (
    <div className="todo-item">
      <div className="todo-item__content">
        <span className="todo-item__title">{task.title}</span>
        <div className="todo-item__actions">
          <button
            className={`todo-item__button todo-item__button--left ${
              isLeftDisabled ? "todo-item__button--disabled" : ""
            }`}
            onClick={onMoveLeft}
            disabled={isLeftDisabled}
            aria-label="Move left"
          >
            ←
          </button>
          <button
            className={`todo-item__button todo-item__button--right ${
              isRightDisabled ? "todo-item__button--disabled" : ""
            }`}
            onClick={onMoveRight}
            disabled={isRightDisabled}
            aria-label="Move right"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};
