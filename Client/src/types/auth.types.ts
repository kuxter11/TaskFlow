import type { UserRole } from "./role.types";

export type AuthMode = "login" | "register";

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginDataResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterDataResponse {
  username: string;
  email: string;
  userRole: UserRole;
}
