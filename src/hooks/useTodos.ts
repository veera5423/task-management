import { useState, useEffect } from 'react';
import type { Todo } from '../types/todo';
import { useSettings } from '../contexts/SettingsContext';
import { showNotification } from '../utils/notifications';
import { playSound } from '../utils/sounds';

const STORAGE_KEY = 'todos';

// Simple AI function to suggest category and priority based on text
const getAISuggestions = (text: string) => {
  const lowerText = text.toLowerCase();
  
  // Simple category detection
  let category = 'General';
  if (lowerText.includes('meeting') || lowerText.includes('call')) {
    category = 'Work';
  } else if (lowerText.includes('buy') || lowerText.includes('shop')) {
    category = 'Shopping';
  } else if (lowerText.includes('read') || lowerText.includes('study')) {
    category = 'Learning';
  } else if (lowerText.includes('exercise') || lowerText.includes('workout')) {
    category = 'Health';
  }

  // Simple priority detection
  let priority: 'high' | 'medium' | 'low' = 'medium';
  if (lowerText.includes('urgent') || lowerText.includes('asap') || lowerText.includes('important')) {
    priority = 'high';
  } else if (lowerText.includes('when') || lowerText.includes('later')) {
    priority = 'low';
  }

  // Simple time estimation
  const estimatedTime = '30 min'; // Default estimation

  return {
    category,
    priority,
    estimatedTime,
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Default to tomorrow
  };
};

export function useTodos() {
  const { notifications, soundEnabled, volume } = useSettings();
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const aiSuggestions = getAISuggestions(text);
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      priority: aiSuggestions.priority,
      category: aiSuggestions.category,
      estimatedTime: aiSuggestions.estimatedTime,
      dueDate: aiSuggestions.dueDate,
    };
    setTodos([...todos, newTodo]);

    // Play sound and show notification if enabled
    if (soundEnabled) {
      playSound('add', volume);
    }
    if (notifications) {
      showNotification('New Task Added', {
        body: text,
        tag: 'new-task'
      });
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const updatedTodo = { 
            ...todo, 
            completed: !todo.completed, 
            updatedAt: new Date().toISOString() 
          };

          // Play sound and show notification if enabled
          if (soundEnabled) {
            playSound('complete', volume);
          }
          if (notifications) {
            showNotification(
              updatedTodo.completed ? 'Task Completed!' : 'Task Reopened',
              {
                body: todo.text,
                tag: 'task-status'
              }
            );
          }

          return updatedTodo;
        }
        return todo;
      })
    );
  };

  const editTodo = (id: string, text: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    const todoToDelete = todos.find(todo => todo.id === id);
    setTodos(todos.filter((todo) => todo.id !== id));

    // Play sound and show notification if enabled
    if (soundEnabled) {
      playSound('delete', volume);
    }
    if (notifications && todoToDelete) {
      showNotification('Task Deleted', {
        body: todoToDelete.text,
        tag: 'task-deleted'
      });
    }
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
  };
} 