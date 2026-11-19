import type { User } from "@/types/user.types";

// Types used only inside the auth feature.
// (AuthMode stays in @/types/auth.types because landing and layout use it too.)

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
