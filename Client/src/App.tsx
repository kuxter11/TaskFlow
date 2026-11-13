import { useState } from "react";

import TopBar from "./components/layout/TopBar/TopBar";
import AuthModal from "./components/auth/AuthModal";

import { Page, type PageId } from "./config/navigation";

import { useAppDispatch, useAppSelector } from "./store/hooks";
import { logout } from "./features/auth/authSlice";

import "./App.css";
import type { AuthMode } from "./types/auth.types";
import Projects from "./components/pages/Projects/Projects";
import Sidebar from "./components/layout/Sidebar/Siderbar";
import LandingPage from "./components/landing/LandingPage";

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.user !== null);

  const isInitializing = useAppSelector((state) => state.auth.isInitializing);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const [activeItem, setActiveItem] = useState<PageId>(Page.Dashboard);

  const dispatch = useAppDispatch();

  const openAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      setActiveItem(Page.Dashboard);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Maps navigation IDs to their corresponding page components.
  const pages: Partial<Record<PageId, React.ReactNode>> = {
    [Page.Dashboard]: (
      <>
        <h1>Dashboard</h1>
        <p>Your dashboard content goes here.</p>
      </>
    ),
    [Page.Projects]: <Projects />,
    [Page.Team]: <h1>Team</h1>,
    [Page.Calendar]: <h1>Calendar</h1>,
    [Page.Settings]: <h1>Settings</h1>,
  };

  if (isInitializing) {
    return <div className="app-loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <>
        <LandingPage onOpenAuth={openAuthModal} />

        <AuthModal
          key={authMode}
          isOpen={isAuthOpen}
          initialMode={authMode}
          onClose={() => setIsAuthOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar
        activeItem={activeItem}
        onNavigate={setActiveItem}
        onLogout={handleLogout}
      />

      <div className="main-layout">
        <TopBar onOpenAuth={openAuthModal} />

        <main className="app-content">
          {pages[activeItem] ?? <h1>Page not found</h1>}
        </main>
      </div>

      <AuthModal
        key={authMode}
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
}

export default App;
