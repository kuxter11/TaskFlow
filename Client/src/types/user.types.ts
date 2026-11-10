import type { UserRole } from "./role.types";

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}
