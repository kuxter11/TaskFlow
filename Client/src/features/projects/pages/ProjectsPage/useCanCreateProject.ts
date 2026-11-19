import { useAppSelector } from "@/app/hooks";
import { UserRole } from "@/types/role.types";

// Only project managers and admins may create projects.
export function useCanCreateProject() {
  const role = useAppSelector((state) => state.auth.user?.role);

  return role === UserRole.ProjectManager || role === UserRole.Admin;
}
