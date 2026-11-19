import { useState } from "react";
import type { AuthMode } from "@/types/auth.types";

// Open/close state of the AuthModal and which tab it opens on.
export function useAuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");

  const open = (newMode: AuthMode) => {
    setMode(newMode);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  return { isOpen, mode, open, close };
}
