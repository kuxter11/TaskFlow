import { useState } from "react";
import { removeProjectMember } from "@/features/projects/projects.api";
import type { ProjectMember } from "@/features/projects/types";

// The member list of a project and how it changes (add / remove).
export function useMemberList(projectId: number, initialMembers: ProjectMember[]) {
  const [members, setMembers] = useState(initialMembers);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const addMember = (member: ProjectMember) => {
    setMembers((previous) =>
      [...previous, member].sort((a, b) =>
        a.username.localeCompare(b.username),
      ),
    );
  };

  const removeMember = async (member: ProjectMember) => {
    const confirmed = window.confirm(
      `Remove ${member.username} from this project? Their tasks will be unassigned.`,
    );
    if (!confirmed) return;

    setRemovingId(member.userId);

    try {
      await removeProjectMember(projectId, member.userId);

      setMembers((previous) =>
        previous.filter((m) => m.userId !== member.userId),
      );
    } catch {
      // The interceptor already showed a toast.
    } finally {
      setRemovingId(null);
    }
  };

  return { members, removingId, addMember, removeMember };
}
