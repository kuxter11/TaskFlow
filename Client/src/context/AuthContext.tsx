import { useEffect, useState, type ReactNode } from "react";
import type { LoginData, RegisterData } from "../types/auth.types";
import type { User } from "../types/user.types";
import {
  register as registerRequest,
  login as loginRequest,
  refresh as refreshRequest,
  logout as logoutRequest,
} from "../api/auth.api";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const result = await refreshRequest();

        setUser(result.user);
        setToken(result.accessToken);
      } catch {
        setUser(null);
        setToken(null);
      } finally {
        setIsInitializing(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (data: LoginData): Promise<void> => {
    const result = await loginRequest(data);
    setUser(result.user);
    setToken(result.accessToken);
  };

  const register = async (data: RegisterData): Promise<void> => {
    await registerRequest(data);
  };

  const logout = async (): Promise<void> => {
    try {
      await logoutRequest();
    } finally {
      setUser(null);
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: user !== null,
        isInitializing,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
