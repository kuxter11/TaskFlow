import type { ProjectMember } from "@/types/project.types";
import Avatar from "./Avatar";
import "./AvatarStack.css";

interface AvatarStackProps {
  members: ProjectMember[];
  max?: number;
}

export default function AvatarStack({ members, max = 3 }: AvatarStackProps) {
  const visible = members.slice(0, max);
  const hidden = members.slice(max);

  return (
    <div className="avatar-stack">
      {visible.map((member) => (
        <Avatar key={member.userId} name={member.username} />
      ))}

      {hidden.length > 0 && (
        <span
          className="avatar avatar-stack-more"
          title={hidden.map((m) => m.username).join(", ")}
        >
          +{hidden.length}
        </span>
      )}
    </div>
  );
}
