import type { AuthMode } from "@/types/auth.types";

export const authTabs: { mode: AuthMode; label: string }[] = [
  { mode: "login", label: "Login" },
  { mode: "register", label: "Register" },
];
