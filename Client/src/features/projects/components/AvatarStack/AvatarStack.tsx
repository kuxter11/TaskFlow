import type { ProjectMember } from "@/features/projects/types";
import Avatar from "@/features/projects/components/Avatar/Avatar";
import styles from "./AvatarStack.module.css";

interface AvatarStackProps {
  members: ProjectMember[];
  max?: number;
}

export default function AvatarStack({ members, max = 3 }: AvatarStackProps) {
  const visible = members.slice(0, max);
  const hidden = members.slice(max);

  return (
    <div className={styles.stack}>
      {visible.map((member) => (
        <Avatar key={member.userId} name={member.username} stacked />
      ))}

      {hidden.length > 0 && (
        <Avatar
          name={hidden.map((m) => m.username).join(", ")}
          variant="muted"
          stacked
        >
          +{hidden.length}
        </Avatar>
      )}
    </div>
  );
}
