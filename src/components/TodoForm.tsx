import { useState } from 'react';
import styles from './TodoForm.module.css';


interface TodoFormProps {
  onAdd: (text: string) => void;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');

    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className={styles.input}
      />
      {/* <select  name="priority" id="priority" className={styles.select}>
        <option value="General" className={styles.general} >General</option>
        <option value="Medium" className={styles.Medium}>Medium</option>
        <option value="High" className={styles.high}>High</option>

      </select> */}
      <button type="submit" className={styles.button}>
        Add Todo
      </button>
    </form>
  );
} 