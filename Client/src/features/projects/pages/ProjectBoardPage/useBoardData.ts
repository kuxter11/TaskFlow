import { useEffect, useState } from "react";
import { getProjectMembers } from "@/features/projects/projects.api";
import { getTasks } from "@/features/projects/tasks.api";
import type { ProjectMember, ProjectTask } from "@/features/projects/types";

interface LoadResult {
  projectId: number;
  tasks: ProjectTask[];
  members: ProjectMember[];
  failed: boolean;
}

// Loads the board's tasks and the project members. Returns null while loading.
export function useBoardData(projectId: number) {
  const [result, setResult] = useState<LoadResult | null>(null);

  useEffect(() => {
    let ignore = false;

    Promise.all([
      getTasks(projectId, { skipErrorToast: true }),
      getProjectMembers(projectId, { skipErrorToast: true }),
    ])
      .then(([tasks, members]) => {
        if (!ignore) setResult({ projectId, tasks, members, failed: false });
      })
      .catch(() => {
        if (!ignore)
          setResult({ projectId, tasks: [], members: [], failed: true });
      });

    return () => {
      ignore = true;
    };
  }, [projectId]);

  return result?.projectId === projectId ? result : null;
}
