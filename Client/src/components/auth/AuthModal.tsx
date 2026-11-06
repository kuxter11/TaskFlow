import { useEffect, useRef, useState, type SyntheticEvent } from "react";

import type { AuthMode } from "../../types/auth.types";
import "./AuthModal.css";

interface AuthModalProps {
  isOpen: boolean;
  initialMode: AuthMode;
  onClose: () => void;
}

export default function AuthModal({
  isOpen,
  initialMode,
  onClose,
}: AuthModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Current active tab.
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  // Synchronize React state with native HTML dialog.
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Handle form submission.
  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (mode === "login") {
      console.log("Login:", { email, password });
    } else {
      console.log("Register:", { name, email, password });
    }
  };

  // Switch between tabs.
  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
  };

  return (
    <dialog ref={dialogRef} className="auth-modal" onClose={onClose}>
      <button
        className="auth-close"
        onClick={() => dialogRef.current?.close()}
        type="button"
        aria-label="Close modal"
      >
        &times;
      </button>

      <div className="auth-header">
        <h2>{mode === "login" ? "Welcome back" : "Create an account"}</h2>

        <p>
          {mode === "login"
            ? "Sign in to continue."
            : "Create an account to get started."}
        </p>
      </div>

      {/* Login / Register tabs */}
      <div className="auth-tabs">
        <button
          type="button"
          className={mode === "login" ? "active" : ""}
          onClick={() => switchMode("login")}
          aria-pressed={mode === "login"}
        >
          Login
        </button>

        <button
          type="button"
          className={mode === "register" ? "active" : ""}
          onClick={() => switchMode("register")}
          aria-pressed={mode === "register"}
        >
          Register
        </button>
      </div>

      {/* Form changes based on active tab */}
      <form onSubmit={handleSubmit}>
        {mode === "register" && (
          <div className="auth-field">
            <label htmlFor="name">Full name</label>

            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
        )}

        <div className="auth-field">
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="auth-field">
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={8}
          />
        </div>

        {mode === "register" && (
          <div className="auth-field">
            <label htmlFor="confirmPassword">Confirm Password</label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Enter confirm your password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              minLength={8}
            />
          </div>
        )}

        <button className="auth-submit" type="submit">
          {mode === "login" ? "Sign in" : "Create account"}
        </button>
      </form>
    </dialog>
  );
}
