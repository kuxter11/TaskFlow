import { useEffect, useState } from "react";
import { getProjectMembers } from "@/features/projects/projects.api";
import type { ProjectMember } from "@/features/projects/types";

interface LoadResult {
  projectId: number;
  members: ProjectMember[];
  failed: boolean;
}

// Loads the members of a project. Returns null while loading.
export function useProjectMembers(projectId: number) {
  const [result, setResult] = useState<LoadResult | null>(null);

  useEffect(() => {
    let ignore = false;

    getProjectMembers(projectId, { skipErrorToast: true })
      .then((members) => {
        if (!ignore) setResult({ projectId, members, failed: false });
      })
      .catch(() => {
        if (!ignore) setResult({ projectId, members: [], failed: true });
      });

    return () => {
      ignore = true;
    };
  }, [projectId]);

  return result?.projectId === projectId ? result : null;
}
