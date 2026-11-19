import Button from "@/components/ui/Button/Button";
import type { AuthMode } from "@/types/auth.types";
import type { User } from "@/types/user.types";
import styles from "./TopBar.module.css";

interface TopBarProps {
  user: User | null;
  isInitializing: boolean;
  onLogout: () => void;
  onOpenAuth: (mode: AuthMode) => void;
}

export default function TopBar({
  user,
  isInitializing,
  onLogout,
  onOpenAuth,
}: TopBarProps) {
  if (isInitializing) {
    return (
      <header className={styles.topbar}>
        <div className={styles.loading}>Loading...</div>
      </header>
    );
  }

  return (
    <header className={styles.topbar}>
      {user ? (
        <div>
          <span className={styles.username}>{user.username}</span>
          <Button variant="secondary" onClick={onLogout}>
            Log out
          </Button>
        </div>
      ) : (
        <div className={styles.auth}>
          <Button variant="primary" onClick={() => onOpenAuth("login")}>
            Login
          </Button>
          <Button variant="secondary" onClick={() => onOpenAuth("register")}>
            Register
          </Button>
        </div>
      )}
    </header>
  );
}
