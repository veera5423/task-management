import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h4>About</h4>
          <p>A simple and efficient task-management application to help you manage your tasks.</p>
        </div>

        <div className={styles.footerSection}>
          <h4>Contact</h4>
          <p>Email: contact@visiontask.com</p>
          <p>Support: support@visiontask.com</p>
        </div>

        <div className={styles.footerSection}>
          <h4>Links</h4>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/help">Help Center</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>Made with <span>❤️</span> by Veeranjaneyulu</p>
        <p>&copy; {new Date().getFullYear()} Vision-<small>Task Management</small>. All rights reserved.</p>
      </div>
    </footer>
  );
} 