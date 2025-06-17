
import styles from './Header.module.css';
import type { View } from '../types/todo';
import { useState } from 'react';

interface HeaderProps {
  onViewChange: (view: View) => void;
  currentView: View;
  currentTheme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export function Header({ onViewChange, currentView, currentTheme, onThemeChange }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (view: View) => {
    onViewChange(view);
    setMenuOpen(false); // close menu after selection
  };

  return (
    <header className={`${styles.header} ${styles[currentTheme]}`}>
      <div className={styles.logo}>
        <span className={styles.logoText}>
          <span className={styles.highlight}>V</span>ision
        </span>
        <span className={styles.tagline}>Task Management</span>
      </div>

      {/* Hamburger button for smaller screens */}
      <button
        className={styles.menuToggle}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {/* Hamburger Icon */}
        <div className={styles.hamburger}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Dropdown menu for mobile */}
      {menuOpen && (
        <div className={styles.dropdownMenu}>
          <a className={styles.navLink} onClick={() => handleNavClick('tasks')}>Tasks</a>
          <a className={styles.navLink} onClick={() => handleNavClick('analytics')}>Analytics</a>
          <a className={styles.navLink} onClick={() => handleNavClick('settings')}>Settings</a>
        </div>
      )}

      {/* Desktop nav links */}
      <nav className={styles.navLinks}>
        <a
          href="#how-to-use"
          className={`${styles.navLink} ${currentView === 'how-to-use' ? styles.active : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onViewChange('how-to-use');
          }}
        >
          How to Use
        </a>
        <a
          href="#tasks"
          className={`${styles.navLink} ${currentView === 'tasks' ? styles.active : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onViewChange('tasks');
          }}
        >
          Tasks
        </a>
        <a
          href="#analytics"
          className={`${styles.navLink} ${currentView === 'analytics' ? styles.active : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onViewChange('analytics');
          }}
        >
          Analytics
        </a>
        <a
          href="#settings"
          className={`${styles.navLink} ${currentView === 'settings' ? styles.active : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onViewChange('settings');
          }}
        >
          Settings
        </a>
      </nav>

      <button
        className={styles.themeButton}
        onClick={() => onThemeChange(currentTheme === 'light' ? 'dark' : 'light')}
      >
        {currentTheme === 'light' ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        )}
      </button>
    </header>
  );
}
