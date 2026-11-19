import type { ProjectMember } from "@/features/projects/types";
import Avatar from "@/features/projects/components/Avatar/Avatar";
import MemberIdentity from "@/features/projects/components/MemberIdentity/MemberIdentity";
import styles from "./CandidateOption.module.css";

interface CandidateOptionProps {
  user: ProjectMember;
  disabled: boolean;
  onSelect: (user: ProjectMember) => void;
}

// One clickable search result in AddMemberField.
export default function CandidateOption({
  user,
  disabled,
  onSelect,
}: CandidateOptionProps) {
  return (
    <button
      type="button"
      className={styles.option}
      disabled={disabled}
      onClick={() => onSelect(user)}
    >
      <Avatar name={user.username} size={28} />
      <MemberIdentity username={user.username} email={user.email} />
    </button>
  );
}
