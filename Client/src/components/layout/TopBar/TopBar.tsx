import { useAuth } from "../../../context/useAuth";
import type { AuthMode } from "../../../types/auth.types";
import Button from "../../common/Button";
import "./TopBar.css";
interface TopBarProps {
  onOpenAuth: (mode: AuthMode) => void;
}

export default function TopBar({ onOpenAuth }: TopBarProps) {
  const { user, isAuthenticated, isInitializing, logout } = useAuth();
  return (
    <header className="topbar">
      {isInitializing ? (
        <div className="topbar-loading">Loading...</div>
      ) : isAuthenticated && user ? (
        <div className="topbar-profile">
          <span className="username">{user.username}</span>
          <Button variant="secondary" onClick={() => logout()}>
            Log out
          </Button>
        </div>
      ) : (
        <div className="topbar-auth">
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
