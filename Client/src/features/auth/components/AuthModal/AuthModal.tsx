import Modal from "@/components/ui/Modal/Modal";
import Button from "@/components/ui/Button/Button";
import type { AuthMode } from "@/types/auth.types";
import AuthTabs from "./AuthTabs/AuthTabs";
import AuthField from "./AuthField/AuthField";
import { useAuthForm } from "./useAuthForm";

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
  const form = useAuthForm(initialMode, onClose);
  const isLogin = form.mode === "login";

  return (
    <Modal
      isOpen={isOpen}
      onClose={form.handleClose}
      variant="centered"
      title={isLogin ? "Welcome back" : "Create an account"}
      description={
        isLogin ? "Sign in to continue." : "Create an account to get started."
      }
    >
      <AuthTabs mode={form.mode} onChange={form.switchMode} />

      {/* Form changes based on active tab */}
      <form onSubmit={form.handleSubmit}>
        {!isLogin && (
          <AuthField
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={form.values.email}
            onChange={(event) => form.setEmail(event.target.value)}
            required
          />
        )}

        <AuthField
          id="username"
          label="Username"
          type="text"
          placeholder="JonDoe297"
          value={form.values.username}
          onChange={(event) => form.setUsername(event.target.value)}
          required
        />

        <AuthField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={form.values.password}
          onChange={(event) => form.setPassword(event.target.value)}
          required
          minLength={6}
        />

        {!isLogin && (
          <AuthField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Enter confirm your password"
            value={form.values.confirmPassword}
            onChange={(event) => form.setConfirmPassword(event.target.value)}
            required
            minLength={8}
          />
        )}

        {form.error && <div role="alert">{form.error}</div>}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={form.isLoading}
        >
          {isLogin ? "Login" : "Register"}
        </Button>
      </form>
    </Modal>
  );
}
