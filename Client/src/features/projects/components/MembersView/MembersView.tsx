import type { Project, ProjectMember } from "@/features/projects/types";
import AddMemberField from "@/features/projects/components/AddMemberField/AddMemberField";
import MemberRow from "@/features/projects/components/MemberRow/MemberRow";
import { useMemberList } from "./useMemberList";
import { useCanManageMembers } from "./useCanManageMembers";
import styles from "./MembersView.module.css";

interface MembersViewProps {
  project: Project;
  initialMembers: ProjectMember[];
}

export default function MembersView({
  project,
  initialMembers,
}: MembersViewProps) {
  const { members, removingId, addMember, removeMember } = useMemberList(
    project.id,
    initialMembers,
  );
  const canManage = useCanManageMembers(project);

  return (
    <section>
      <h2 className={styles.title}>
        Project Members
        <span className={styles.count}>{members.length}</span>
      </h2>

      {canManage && (
        <AddMemberField projectId={project.id} onAdded={addMember} />
      )}

      <ul className={styles.list}>
        {members.map((member) => {
          const isOwner = member.userId === project.createdBy;

          return (
            <MemberRow
              key={member.userId}
              member={member}
              isOwner={isOwner}
              canRemove={canManage && !isOwner}
              isRemoving={removingId === member.userId}
              onRemove={removeMember}
            />
          );
        })}
      </ul>
    </section>
  );
}
