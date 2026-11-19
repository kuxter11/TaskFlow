import type { AuthMode } from "@/types/auth.types";
import styles from "./LandingNavbar.module.css";

interface LandingNavbarProps {
  onOpenAuth: (mode: AuthMode) => void;
}

export default function LandingNavbar({ onOpenAuth }: LandingNavbarProps) {
  return (
    <header className={styles.navbar}>
      <a href="#" className={styles.logo}>
        <span className={styles.logoIcon}>M</span>
        <span>TaskFlow</span>
      </a>

      <nav className={styles.links}>
        <a href="#features" className={styles.link}>
          Features
        </a>
        <a href="#about" className={styles.link}>
          About
        </a>
      </nav>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.button} ${styles.login}`}
          onClick={() => onOpenAuth("login")}
        >
          Login
        </button>

        <button
          type="button"
          className={`${styles.button} ${styles.register}`}
          onClick={() => onOpenAuth("register")}
        >
          Get Started
        </button>
      </div>
    </header>
  );
}
