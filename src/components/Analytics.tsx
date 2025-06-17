import { useTodos } from '../hooks/useTodos';
import styles from './Analytics.module.css';

export function Analytics() {
  const { todos } = useTodos();

  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const tasksByPriority = todos.reduce((acc, todo) => {
    acc[todo.priority] = (acc[todo.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const tasksByCategory = todos.reduce((acc, todo) => {
    acc[todo.category] = (acc[todo.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className={styles.analytics}>
      <h2>Task Analytics</h2>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Tasks</h3>
          <p className={styles.statNumber}>{totalTasks}</p>
        </div>
        
        <div className={styles.statCard}>
          <h3>Completed</h3>
          <p className={styles.statNumber}>{completedTasks}</p>
        </div>
        
        <div className={styles.statCard}>
          <h3>Active</h3>
          <p className={styles.statNumber}>{activeTasks}</p>
        </div>
        
        <div className={styles.statCard}>
          <h3>Completion Rate</h3>
          <p className={styles.statNumber}>{completionRate}%</p>
        </div>
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h3>Tasks by Priority</h3>
          <div className={styles.chart}>
            {Object.entries(tasksByPriority).map(([priority, count]) => (
              <div key={priority} className={styles.chartBar}>
                <div className={styles.barLabel}>{priority}</div>
                <div className={styles.barContainer}>
                  <div 
                    className={`${styles.bar} ${styles[`priority${priority}`]}`}
                    style={{ width: `${(count / totalTasks) * 100}%` }}
                  >
                    {count}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.chartCard}>
          <h3>Tasks by Category</h3>
          <div className={styles.chart}>
            {Object.entries(tasksByCategory).map(([category, count]) => (
              <div key={category} className={styles.chartBar}>
                <div className={styles.barLabel}>{category}</div>
                <div className={styles.barContainer}>
                  <div 
                    className={styles.bar}
                    style={{ width: `${(count / totalTasks) * 100}%` }}
                  >
                    {count}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 