import { useState, type SyntheticEvent } from "react";
import { useAppDispatch } from "@/app/hooks";
import type { AuthMode } from "@/types/auth.types";
import { login, register } from "../../authSlice";

// All form state and submit logic of the AuthModal, kept out of the JSX.
export function useAuthForm(initialMode: AuthMode, onClose: () => void) {
  const dispatch = useAppDispatch();

  const [mode, setMode] = useState<AuthMode>(initialMode);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setError("");
    setIsLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const switchMode = (newMode: AuthMode) => {
    resetForm();
    setMode(newMode);
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

  return {
    mode,
    switchMode,
    values: { email, password, confirmPassword, username },
    setEmail,
    setPassword,
    setConfirmPassword,
    setUsername,
    isLoading,
    error,
    handleSubmit,
    handleClose,
  };
}
