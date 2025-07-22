import React from 'react';
import { Board } from './components';
import { useTasks } from './hooks/useTasks/useTasks';
import './App.css';

export function ChallengeComponent() {
  const { tasks, addTask, moveTask } = useTasks();

  return (
    <div className="app">
      <Board 
        tasks={tasks}
        onMoveTask={moveTask}
        onAddTask={addTask}
      />
    </div>
  );
}
