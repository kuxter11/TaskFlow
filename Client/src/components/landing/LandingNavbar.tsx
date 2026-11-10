import "./LandingNavbar.css";
import type { AuthMode } from "../../types/auth.types";

interface LandingNavbarProps {
  onOpenAuth: (mode: AuthMode) => void;
}

export default function LandingNavbar({ onOpenAuth }: LandingNavbarProps) {
  return (
    <header className="landing-navbar">
      <a href="#" className="landing-logo">
        <span className="landing-logo-icon">M</span>
        <span>TaskFlow</span>
      </a>

      <nav className="landing-nav-links">
        <a href="#features">Features</a>
        <a href="#about">About</a>
      </nav>

      <div className="landing-nav-actions">
        <button
          type="button"
          className="landing-login-button"
          onClick={() => onOpenAuth("login")}
        >
          Login
        </button>

        <button
          type="button"
          className="landing-register-button"
          onClick={() => onOpenAuth("register")}
        >
          Get Started
        </button>
      </div>
    </header>
  );
}
