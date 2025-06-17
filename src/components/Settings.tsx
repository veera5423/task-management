import styles from './Settings.module.css';
import { useSettings } from '../contexts/SettingsContext';
// import { TestFeatures } from './TestFeatures';

interface SettingsProps {
  onThemeChange: (theme: 'light' | 'dark') => void;
  currentTheme: 'light' | 'dark';
}

export function Settings({ onThemeChange, currentTheme }: SettingsProps) {
  const {
    notifications,
    soundEnabled,
    volume,
    autoArchive,
    toggleNotifications,
    toggleSound,
    setVolume,
    toggleAutoArchive,
  } = useSettings();

  return (
    <div className={styles.settings}>
      <h2>Settings</h2>
      
      <div className={styles.settingsGrid}>
        <div className={styles.settingCard}>
          <h3>Appearance</h3>
          <div className={styles.settingItem}>
            <label>Theme</label>
            <div className={styles.themeToggle}>
              <button
                className={`${styles.themeButton} ${currentTheme === 'light' ? styles.active : ''}`}
                onClick={() => onThemeChange('light')}
              >
                Light
              </button>
              <button
                className={`${styles.themeButton} ${currentTheme === 'dark' ? styles.active : ''}`}
                onClick={() => onThemeChange('dark')}
              >
                Dark
              </button>
            </div>
          </div>
        </div>

        <div className={styles.settingCard}>
          <h3>Notifications</h3>
          <div className={styles.settingItem}>
            <label>Enable Notifications</label>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={notifications}
                onChange={toggleNotifications}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.settingItem}>
            <label>Sound Effects</label>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={toggleSound}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          {soundEnabled && (
            <div className={styles.settingItem}>
              <label>Volume</label>
              <div className={styles.volumeControl}>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className={styles.volumeSlider}
                />
                <span className={styles.volumeValue}>{Math.round(volume * 100)}%</span>
              </div>
            </div>
          )}
        </div>

        <div className={styles.settingCard}>
          <h3>Task Management</h3>
          <div className={styles.settingItem}>
            <label>Auto-archive completed tasks</label>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={autoArchive}
                onChange={toggleAutoArchive}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
      </div>

      {/* <TestFeatures /> */}
    </div>
  );
} 