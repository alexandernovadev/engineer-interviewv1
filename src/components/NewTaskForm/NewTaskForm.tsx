import React, { useState } from "react";
import { NewTaskFormProps } from "./types";
import "./NewTaskForm.css";

export const NewTaskForm: React.FC<NewTaskFormProps> = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onAddTask(taskTitle);
      setTaskTitle("");
    }
  };

  return (
    <form className="new-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Add Task"
        className="new-task-form__input"
      />
      <button type="submit" className="new-task-form__button">
        +
      </button>
    </form>
  );
};
