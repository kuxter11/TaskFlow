import { Outlet, useNavigate } from "react-router";
import Sidebar from "./Sidebar/Siderbar";
import TopBar from "./TopBar/TopBar";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../features/auth/authSlice";
import type { AuthMode } from "../../types/auth.types";

interface LayoutProps {
  onOpenAuth: (mode: AuthMode) => void;
}

export default function Layout({ onOpenAuth }: LayoutProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/dashboard");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar onLogout={handleLogout} />

      <div className="main-layout">
        <TopBar onOpenAuth={onOpenAuth} />

        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
