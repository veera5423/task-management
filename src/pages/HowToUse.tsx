import React from 'react';
import styles from './HowToUse.module.css';

const HowToUse: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>How to Use Vision</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Features</h2>
        <ul className={styles.list}>
          <li>Create, edit, and delete todos</li>
          <li>Mark todos as complete/incomplete</li>
          <li>Automatic priority and category detection</li>
          <li>Estimated time tracking</li>
          <li>Due date management</li>
          <li>Local storage persistence</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Automatic Priority Detection</h2>
        <p className={styles.paragraph}>The app automatically detects priority based on keywords in your todo text:</p>
        <div className={styles.infoBox}>
          <h3 className={styles.subtitle}>High Priority Keywords:</h3>
          <ul className={styles.list}>
            <li>urgent</li>
            <li>asap</li>
            <li>important</li>
          </ul>
          <h3 className={styles.subtitle}>Low Priority Keywords:</h3>
          <ul className={styles.list}>
            <li>when</li>
            <li>later</li>
          </ul>
          <p className={styles.note}>If none of these keywords are found, the priority will default to "medium".</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Automatic Category Detection</h2>
        <p className={styles.paragraph}>The app automatically categorizes your todos based on keywords:</p>
        <div className={styles.infoBox}>
          <h3 className={styles.subtitle}>Category Keywords:</h3>
          <ul className={styles.list}>
            <li><strong>Work:</strong> meeting, call</li>
            <li><strong>Shopping:</strong> buy, shop</li>
            <li><strong>Learning:</strong> read, study</li>
            <li><strong>Health:</strong> exercise, workout</li>
          </ul>
          <p className={styles.note}>If none of these keywords are found, the category will default to "General".</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Example Usage</h2>
        <div className={styles.infoBox}>
          <h3 className={styles.subtitle}>Example Todos:</h3>
          <ul className={styles.list}>
            <li>"<strong>Urgent meeting</strong> with team" → High Priority, Work Category</li>
            <li>"<strong>Buy groceries</strong> for dinner" → Medium Priority, Shopping Category</li>
            <li>"<strong>Read</strong> the new book" → Medium Priority, Learning Category</li>
            <li>"<strong>Exercise</strong> later today" → Low Priority, Health Category</li>
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Tips for Best Results</h2>
        <ul className={styles.list}>
          <li>Use clear, descriptive text for your todos</li>
          <li>Include relevant keywords to get accurate automatic categorization</li>
          <li>You can always edit the priority and category after creation</li>
          <li>Add estimated time and due dates for better task management</li>
        </ul>
      </section>
    </div>
  );
};

export default HowToUse; 