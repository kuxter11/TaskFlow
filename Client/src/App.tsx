import { useState } from "react";
import AuthModal from "./components/auth/AuthModal";
import type { AuthMode } from "./types/auth.types";

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const openAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <>
      <header className="app-header">
        <h1>TaskFlow</h1>

        <div className="auth-buttons">
          <button onClick={() => openAuthModal("login")}>Login</button>

          <button onClick={() => openAuthModal("register")}>Register</button>
        </div>
      </header>

      <main>
        <h2>Welcome!</h2>
      </main>

      <AuthModal
        key={authMode}
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
      />
    </>
  );
}

export default App;
