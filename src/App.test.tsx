import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the challenge application', () => {
  render(<App />);
  
  // Check that the main components are rendered
  expect(screen.getByText('Welcome To The Every.io Code Challenge.')).toBeInTheDocument();
  expect(screen.getByText('To Do')).toBeInTheDocument();
  expect(screen.getByText('In Progress')).toBeInTheDocument();
  expect(screen.getByText('Done')).toBeInTheDocument();
  
  // Check that initial tasks are present
  expect(screen.getByText('Mow The lawn')).toBeInTheDocument();
  expect(screen.getByText('Pull Weeds')).toBeInTheDocument();
  expect(screen.getByText('Rake the leaves')).toBeInTheDocument();
  
  // Check that the add task form is present
  expect(screen.getByPlaceholderText('Add Task')).toBeInTheDocument();
  expect(screen.getByText('+')).toBeInTheDocument();
});
