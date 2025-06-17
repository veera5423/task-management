import { useState } from 'react';
import type { Todo } from '../types/todo';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(todo.text);
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return styles.priorityHigh;
      case 'medium':
        return styles.priorityMedium;
      case 'low':
        return styles.priorityLow;
      default:
        return '';
    }
  };

  return (
    <div className={styles.todoItem}>
      <div className={styles.todoContent}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className={styles.checkbox}
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyPress}
            autoFocus
            className={styles.editInput}
          />
        ) : (
          <span className={`${styles.todoText} ${todo.completed ? styles.completed : ''}`}>
            {todo.text}
          </span>
        )}
      </div>
      <div className={styles.todoControls}>
        <span className={styles.todoDate}>
          {new Date(todo.createdAt).toLocaleDateString()}
        </span>
        <div className={styles.todoActions}>
          <button
            onClick={() => setIsEditing(true)}
            className={styles.editButton}
            aria-label="Edit todo"
          >
            ✎
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className={styles.deleteButton}
            aria-label="Delete todo"
          >
            🗑
          </button>
        </div>
      </div>
      <div className={`${styles.priority} ${getPriorityClass(todo.priority)}`}>
        {todo.priority}
      </div>
      <div className={styles.category}>
        {todo.category}
      </div>
      <div className={styles.timestamp}>
        {todo.dueDate ? (
          <>
            Due: {new Date(todo.dueDate).toLocaleDateString()}
            {todo.estimatedTime && ` (${todo.estimatedTime})`}
          </>
        ) : (
          `Created: ${new Date(todo.createdAt).toLocaleString()}`
        )}
      </div>
      {/* {todo.aiSuggestions && (
        <div className={styles.aiSuggestions}>
          <small>AI suggests: {todo.aiSuggestions.category} | {todo.aiSuggestions.priority} priority</small>
        </div>
      )} */}
    </div>
  );
} 