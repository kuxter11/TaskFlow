import type { User } from "./user.types";

export type AuthMode = "login" | "register";

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginDataResponse {
  accessToken: string;
  user: User;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
