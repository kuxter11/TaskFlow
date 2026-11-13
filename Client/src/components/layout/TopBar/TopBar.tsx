import { logout } from "../../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import type { AuthMode } from "../../../types/auth.types";
import Button from "../../common/Button";
import "./TopBar.css";
interface TopBarProps {
  onOpenAuth: (mode: AuthMode) => void;
}

export default function TopBar({ onOpenAuth }: TopBarProps) {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = user !== null;
  const isInitializing = useAppSelector((state) => state.auth.isInitializing);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="topbar">
      {isInitializing ? (
        <div className="topbar-loading">Loading...</div>
      ) : isAuthenticated && user ? (
        <div className="topbar-profile">
          <span className="username">{user.username}</span>
          <Button variant="secondary" onClick={handleLogout}>
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
