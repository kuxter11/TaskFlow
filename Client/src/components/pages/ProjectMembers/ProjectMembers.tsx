import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { getProjectMembers } from "@/api/projects.api";
import type {
  ProjectMember,
  ProjectOutletContext,
} from "@/types/project.types";
import "./ProjectMembers.css";
import MembersView from "./MemberView";

interface LoadResult {
  projectId: number;
  members: ProjectMember[];
  failed: boolean;
}

export default function ProjectMembers() {
  const { project } = useOutletContext<ProjectOutletContext>();
  const id = project.id;

  const [result, setResult] = useState<LoadResult | null>(null);

  useEffect(() => {
    let ignore = false;

    getProjectMembers(id, { skipErrorToast: true })
      .then((members) => {
        if (!ignore) setResult({ projectId: id, members, failed: false });
      })
      .catch(() => {
        if (!ignore) setResult({ projectId: id, members: [], failed: true });
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (result === null || result.projectId !== id) {
    return <p>Loading members...</p>;
  }

  if (result.failed) {
    return <p>Failed to load members.</p>;
  }

  return (
    <MembersView key={id} project={project} initialMembers={result.members} />
  );
}
