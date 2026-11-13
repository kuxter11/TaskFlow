import { useEffect, useRef, useState, type SyntheticEvent } from "react";

import type { AuthMode } from "../../types/auth.types";
import "./AuthModal.css";
import Button from "../common/Button";
import { useAppDispatch } from "../../store/hooks";
import { login, register } from "../../features/auth/authSlice";

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
  const dispatch = useAppDispatch();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [mode, setMode] = useState<AuthMode>(initialMode);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setName] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setError("");

    try {
      if (mode === "login") {
        await dispatch(login({ username, password })).unwrap();
      } else {
        await dispatch(
          register({ username, email, password, confirmPassword }),
        ).unwrap();
      }

      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (newMode: AuthMode) => {
    resetForm();
    setMode(newMode);
    setError("");
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setError("");
    setIsLoading(false);
  };

  return (
    <dialog ref={dialogRef} className="auth-modal" onClose={handleClose}>
      <button
        className="auth-close"
        onClick={() => handleClose()}
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
        )}
        <div className="auth-field">
          <label htmlFor="username">Username</label>

          <input
            id="username"
            type="text"
            placeholder="JonDoe297"
            value={username}
            onChange={(event) => setName(event.target.value)}
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
            minLength={6}
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

        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

        <div className="auth-form-actions">
          <Button type="submit" variant="primary" isLoading={isLoading}>
            {mode === "login" ? "Login" : "Register"}
          </Button>
        </div>
      </form>
    </dialog>
  );
}
