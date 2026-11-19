import { useOutletContext } from "react-router";
import type { ProjectOutletContext } from "@/features/projects/types";
import MembersView from "@/features/projects/components/MembersView/MembersView";
import { useProjectMembers } from "./useProjectMembers";

export default function ProjectMembersPage() {
  const { project } = useOutletContext<ProjectOutletContext>();
  const result = useProjectMembers(project.id);

  if (result === null) {
    return <p>Loading members...</p>;
  }

  if (result.failed) {
    return <p>Failed to load members.</p>;
  }

  return (
    <MembersView
      key={project.id}
      project={project}
      initialMembers={result.members}
    />
  );
}
