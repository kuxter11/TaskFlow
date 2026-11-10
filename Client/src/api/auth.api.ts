import type {
  LoginData,
  LoginDataResponse,
  RegisterData,
} from "../types/auth.types";
import type { User } from "../types/user.types";

const API_URL = import.meta.env.VITE_API_URL;

// Login & Register
async function authRequest<T>(
  endpoint: string,
  data: LoginData | RegisterData,
): Promise<T> {
  if (!API_URL) {
    throw new Error("API URL is not configured");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message || `Request failed: ${response.status}`);
  }

  return result as T;
}

export function login(data: LoginData): Promise<LoginDataResponse> {
  return authRequest("/auth/login", data);
}

export function register(data: RegisterData): Promise<User> {
  return authRequest("/auth/register", data);
}

// Refresh token
export async function refresh(): Promise<LoginDataResponse> {
  if (!API_URL) {
    throw new Error("API URL is not configured");
  }

  const response = await fetch(`${API_URL}/auth/refresh-token`, {
    method: "POST",
    credentials: "include",
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(result?.message || `Request failed: ${response.status}`);
  }

  return result as LoginDataResponse;
}

// Log out
export async function logout(): Promise<void> {
  if (!API_URL) {
    throw new Error("API URL is not configured");
  }

  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Logout failed: ${response.status}`);
  }
}
