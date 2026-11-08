import type { UserRole } from "./role.types";

export interface User {
  username: string;
  email: string;
  role: UserRole;
}
