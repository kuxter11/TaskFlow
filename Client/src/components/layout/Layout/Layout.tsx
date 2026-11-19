// Import this component's CSS before its children's, so page styles
// (loaded later) still win over the base typography below.
import styles from "./Layout.module.css";
import { Outlet } from "react-router";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import TopBar from "@/components/layout/TopBar/TopBar";
import type { AuthMode } from "@/types/auth.types";
import type { User } from "@/types/user.types";

interface LayoutProps {
  user: User | null;
  isInitializing: boolean;
  onLogout: () => void;
  onOpenAuth: (mode: AuthMode) => void;
}

// App shell: sidebar on the left, top bar + routed page on the right.
export default function Layout({
  user,
  isInitializing,
  onLogout,
  onOpenAuth,
}: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Sidebar onLogout={onLogout} />

      <div className={styles.main}>
        <TopBar
          user={user}
          isInitializing={isInitializing}
          onLogout={onLogout}
          onOpenAuth={onOpenAuth}
        />

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
