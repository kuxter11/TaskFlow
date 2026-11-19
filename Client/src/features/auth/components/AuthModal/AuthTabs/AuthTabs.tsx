import type { AuthMode } from "@/types/auth.types";
import { authTabs } from "./AuthTabs.data";
import styles from "./AuthTabs.module.css";

interface AuthTabsProps {
  mode: AuthMode;
  onChange: (mode: AuthMode) => void;
}

// Login / Register switch at the top of the AuthModal.
export default function AuthTabs({ mode, onChange }: AuthTabsProps) {
  return (
    <div className={styles.tabs}>
      {authTabs.map((tab) => {
        const isActive = tab.mode === mode;

        return (
          <button
            key={tab.mode}
            type="button"
            className={isActive ? `${styles.tab} ${styles.active}` : styles.tab}
            onClick={() => onChange(tab.mode)}
            aria-pressed={isActive}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
