import { useState } from "react";
import AuthModal from "./components/auth/AuthModal";
import LandingPage from "./components/landing/LandingPage";
import type { AuthMode } from "./types/auth.types";
import Sidebar from "./components/layout/Sidebar/Siderbar";
import TopBar from "./components/layout/TopBar/TopBar";
import { useAuth } from "./context/useAuth";
import "./App.css";

function App() {
  const { isAuthenticated, isInitializing } = useAuth();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const [activeItem, setActiveItem] = useState("Dashboard");

  const openAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  if (isInitializing) {
    return <div className="app-loading">Loading...</div>;
  }

  // Landing Page.
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

  // Authenticated dashboard.
  return (
    <div className="app-layout">
      <Sidebar activeItem={activeItem} onNavigate={setActiveItem} />

      <div className="main-layout">
        <TopBar onOpenAuth={openAuthModal} />

        <main className="app-content">
          <h1>{activeItem}</h1>
          <p>Your page content goes here.</p>
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
