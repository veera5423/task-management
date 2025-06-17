import { useSettings } from '../contexts/SettingsContext';
import { showNotification } from '../utils/notifications';
import { playSound } from '../utils/sounds';
import styles from './TestFeatures.module.css';

export function TestFeatures() {
  const { notifications, soundEnabled } = useSettings();

  const testNotification = () => {
    if (notifications) {
      showNotification('Test Notification', {
        body: 'This is a test notification',
        tag: 'test'
      });
    }
  };

  const testSound = () => {
    if (soundEnabled) {
      playSound('add');
    }
  };

  return (
    <div className={styles.testFeatures}>
      <h3>Test Features</h3>
      <div className={styles.testButtons}>
        <button
          onClick={testNotification}
          disabled={!notifications}
          className={styles.testButton}
        >
          Test Notification
        </button>
        <button
          onClick={testSound}
          disabled={!soundEnabled}
          className={styles.testButton}
        >
          Test Sound
        </button>
      </div>
      <div className={styles.status}>
        <p>Notifications: {notifications ? 'Enabled' : 'Disabled'}</p>
        <p>Sound Effects: {soundEnabled ? 'Enabled' : 'Disabled'}</p>
      </div>
    </div>
  );
} 