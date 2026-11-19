import { useAppSelector } from "@/app/hooks";
import type { Project } from "@/features/projects/types";
import { UserRole } from "@/types/role.types";

// The project owner, admins and project managers may add/remove members.
export function useCanManageMembers(project: Project) {
  const currentUser = useAppSelector((state) => state.auth.user);

  return (
    currentUser?.id === project.createdBy ||
    currentUser?.role === UserRole.Admin ||
    currentUser?.role === UserRole.ProjectManager
  );
}
