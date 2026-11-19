import { X } from "lucide-react";
import type { ProjectMember } from "@/features/projects/types";
import Avatar from "@/features/projects/components/Avatar/Avatar";
import MemberIdentity from "@/features/projects/components/MemberIdentity/MemberIdentity";
import styles from "./MemberRow.module.css";

interface MemberRowProps {
  member: ProjectMember;
  isOwner: boolean;
  canRemove: boolean;
  isRemoving: boolean;
  onRemove: (member: ProjectMember) => void;
}

export default function MemberRow({
  member,
  isOwner,
  canRemove,
  isRemoving,
  onRemove,
}: MemberRowProps) {
  return (
    <li className={styles.row}>
      <Avatar name={member.username} size={40} />

      <MemberIdentity username={member.username} email={member.email} />

      {isOwner && <span className={styles.badge}>Owner</span>}

      {canRemove && (
        <button
          type="button"
          className={styles.remove}
          disabled={isRemoving}
          onClick={() => onRemove(member)}
          aria-label={`Remove ${member.username}`}
        >
          <X size={16} />
        </button>
      )}
    </li>
  );
}
