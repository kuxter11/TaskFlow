import { UserPlus } from "lucide-react";
import type { ProjectMember } from "@/features/projects/types";
import Avatar from "@/features/projects/components/Avatar/Avatar";

interface TaskAssigneeProps {
  assigneeId: string | null;
  members: ProjectMember[];
}

// Avatar in a task card's footer. No styles of its own → single file, no CSS module.
export default function TaskAssignee({ assigneeId, members }: TaskAssigneeProps) {
  if (!assigneeId) {
    return (
      <Avatar name="Unassigned" variant="empty">
        <UserPlus size={14} />
      </Avatar>
    );
  }

  const assignee = members.find((m) => m.userId === assigneeId);

  if (!assignee) {
    // Assigned to someone who is no longer a project member.
    return <Avatar name="Former member">?</Avatar>;
  }

  return <Avatar name={assignee.username} />;
}
