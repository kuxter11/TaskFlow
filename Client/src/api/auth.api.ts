import type {
  LoginData,
  LoginDataResponse,
  RegisterData,
  RegisterDataResponse,
} from "../types/auth.types";

const API_URL = import.meta.env.VITE_API_URL;

async function authRequest<T>(
  endpoint: string,
  data: LoginData | RegisterData,
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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

export function register(data: RegisterData): Promise<RegisterDataResponse> {
  return authRequest("/auth/register", data);
}
