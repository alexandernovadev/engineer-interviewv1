import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChallengeComponent } from "../ChallengeComponent";

describe("ChallengeComponent - Functional Tests", () => {
  beforeEach(() => {
    render(<ChallengeComponent />);
  });

  // Helper functions to reduce repetition
  const getTaskElement = (taskTitle: string) => 
    screen.getByText(taskTitle).closest(".todo-item");

  const getColumnElement = (columnTitle: string) => 
    screen.getByText(columnTitle).closest(".column");

  const clickTaskButton = (taskTitle: string, direction: "left" | "right") => {
    const task = getTaskElement(taskTitle);
    const button = task?.querySelector(`.todo-item__button--${direction}`);
    fireEvent.click(button!);
  };

  const addNewTask = (taskTitle: string) => {
    const input = screen.getByPlaceholderText("Add Task");
    const addButton = screen.getByText("+");
    fireEvent.change(input, { target: { value: taskTitle } });
    fireEvent.click(addButton);
  };

  const expectTaskInColumn = (taskTitle: string, columnTitle: string) => {
    const column = getColumnElement(columnTitle);
    expect(column).toHaveTextContent(taskTitle);
  };

  const expectTaskNotInColumn = (taskTitle: string, columnTitle: string) => {
    const column = getColumnElement(columnTitle);
    expect(column).not.toHaveTextContent(taskTitle);
  };

  describe("Initial State", () => {
    it("renders the board with three columns", () => {
      expect(screen.getByText("To Do")).toBeInTheDocument();
      expect(screen.getByText("In Progress")).toBeInTheDocument();
      expect(screen.getByText("Done")).toBeInTheDocument();
    });

    it("displays initial tasks in correct columns", () => {
      expectTaskInColumn("Learn JavaScript", "To Do");
      expectTaskInColumn("Master React", "In Progress");
      expectTaskInColumn("Study TypeScript", "Done");
    });

    it("shows correct button states for initial tasks", () => {
      // To Do task should have left button disabled
      const todoTask = getTaskElement("Learn JavaScript");
      const leftButton = todoTask?.querySelector(".todo-item__button--left");
      expect(leftButton).toHaveClass("todo-item__button--disabled");

      // Done task should have right button disabled
      const doneTask = getTaskElement("Study TypeScript");
      const rightButton = doneTask?.querySelector(".todo-item__button--right");
      expect(rightButton).toHaveClass("todo-item__button--disabled");
    });
  });

  describe("Task Movement Functionality", () => {
    it("moves task from Todo to In Progress when clicking right arrow", () => {
      clickTaskButton("Learn JavaScript", "right");
      
      expectTaskInColumn("Learn JavaScript", "In Progress");
      expectTaskNotInColumn("Learn JavaScript", "To Do");
    });

    it("moves task from In Progress to Done when clicking right arrow", () => {
      clickTaskButton("Master React", "right");
      
      expectTaskInColumn("Master React", "Done");
      expectTaskNotInColumn("Master React", "In Progress");
    });

    it("moves task from Done to In Progress when clicking left arrow", () => {
      clickTaskButton("Study TypeScript", "left");
      
      expectTaskInColumn("Study TypeScript", "In Progress");
      expectTaskNotInColumn("Study TypeScript", "Done");
    });

    it("moves task from In Progress to Todo when clicking left arrow", () => {
      clickTaskButton("Master React", "left");
      
      expectTaskInColumn("Master React", "To Do");
      expectTaskNotInColumn("Master React", "In Progress");
    });

    it("prevents moving task from Todo to left (button disabled)", () => {
      const todoTask = getTaskElement("Learn JavaScript");
      const leftButton = todoTask?.querySelector(".todo-item__button--left") as HTMLButtonElement;
      
      expect(leftButton.disabled).toBe(true);
      expect(leftButton).toHaveClass("todo-item__button--disabled");
    });

    it("prevents moving task from Done to right (button disabled)", () => {
      const doneTask = getTaskElement("Study TypeScript");
      const rightButton = doneTask?.querySelector(".todo-item__button--right") as HTMLButtonElement;
      
      expect(rightButton.disabled).toBe(true);
      expect(rightButton).toHaveClass("todo-item__button--disabled");
    });
  });

  describe("Add Task Functionality", () => {
    it("adds new task to Todo column when form is submitted", () => {
      addNewTask("New Test Task");
      
      expectTaskInColumn("New Test Task", "To Do");
      
      // Input should be cleared
      const input = screen.getByPlaceholderText("Add Task");
      expect(input).toHaveValue("");
    });

    it("does not add empty task when form is submitted", () => {
      const addButton = screen.getByText("+");
      fireEvent.click(addButton);
      
      // Should not add empty task
      const allTasks = screen.getAllByText(/Learn JavaScript|Master React|Study TypeScript/);
      expect(allTasks).toHaveLength(3); // Only initial tasks
    });

    it("does not add task with only whitespace", () => {
      addNewTask("   ");
      
      // Should not add whitespace-only task
      const allTasks = screen.getAllByText(/Learn JavaScript|Master React|Study TypeScript/);
      expect(allTasks).toHaveLength(3);
    });

    it("adds multiple tasks correctly", () => {
      addNewTask("First Task");
      addNewTask("Second Task");
      
      expectTaskInColumn("First Task", "To Do");
      expectTaskInColumn("Second Task", "To Do");
    });
  });

  describe("Task Movement After Adding", () => {
    it("can move newly added task through all columns", () => {
      addNewTask("Movable Task");
      
      // Move from Todo to In Progress
      clickTaskButton("Movable Task", "right");
      expectTaskInColumn("Movable Task", "In Progress");
      
      // Move from In Progress to Done
      clickTaskButton("Movable Task", "right");
      expectTaskInColumn("Movable Task", "Done");
    });
  });

  describe("Edge Cases", () => {
    it("handles rapid task movements correctly", () => {
      // Rapid clicks to move task through all columns
      clickTaskButton("Learn JavaScript", "right");
      clickTaskButton("Learn JavaScript", "right");
      clickTaskButton("Learn JavaScript", "right");
      
      expectTaskInColumn("Learn JavaScript", "Done");
    });

    it("maintains task order when multiple tasks are in same column", () => {
      addNewTask("Task 1");
      addNewTask("Task 2");
      
      const todoColumn = getColumnElement("To Do");
      const tasks = todoColumn?.textContent;
      
      // Verify order: original task + new tasks
      expect(tasks).toMatch(/Learn JavaScript.*Task 1.*Task 2/);
    });
  });
});
