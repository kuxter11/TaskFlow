import { useState } from "react";
import { X } from "lucide-react";
import { removeProjectMember } from "@/api/projects.api";
import { useAppSelector } from "@/app/hooks";
import type { Project, ProjectMember } from "@/types/project.types";
import { UserRole } from "@/types/role.types";
import Avatar from "@/components/common/Avatar";
import AddMemberField from "./AddMemberField";
import "./ProjectMembers.css";

interface MembersViewProps {
  project: Project;
  initialMembers: ProjectMember[];
}

export default function MembersView({
  project,
  initialMembers,
}: MembersViewProps) {
  const currentUser = useAppSelector((state) => state.auth.user);

  const [members, setMembers] = useState(initialMembers);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const canManage =
    currentUser?.id === project.createdBy ||
    currentUser?.role === UserRole.Admin ||
    currentUser?.role === UserRole.ProjectManager;

  const handleAdded = (member: ProjectMember) => {
    setMembers((previous) =>
      [...previous, member].sort((a, b) =>
        a.username.localeCompare(b.username),
      ),
    );
  };

  const handleRemove = async (member: ProjectMember) => {
    const confirmed = window.confirm(
      `Remove ${member.username} from this project? Their tasks will be unassigned.`,
    );
    if (!confirmed) return;

    setRemovingId(member.userId);

    try {
      await removeProjectMember(project.id, member.userId);

      setMembers((previous) =>
        previous.filter((m) => m.userId !== member.userId),
      );
    } catch {
      // The interceptor already showed a toast.
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <section>
      <h2 className="members-title">
        Project Members
        <span className="members-count">{members.length}</span>
      </h2>

      {canManage && (
        <AddMemberField projectId={project.id} onAdded={handleAdded} />
      )}

      <ul className="members-list">
        {members.map((member) => {
          const isOwner = member.userId === project.createdBy;

          return (
            <li key={member.userId} className="member-row">
              <Avatar name={member.username} size={40} />

              <div className="member-info">
                <span className="member-name">{member.username}</span>
                <span className="member-email">{member.email}</span>
              </div>

              {isOwner && <span className="member-badge">Owner</span>}

              {canManage && !isOwner && (
                <button
                  type="button"
                  className="member-remove"
                  disabled={removingId === member.userId}
                  onClick={() => handleRemove(member)}
                  aria-label={`Remove ${member.username}`}
                >
                  <X size={16} />
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
