import { useEffect, useState } from "react";
import { getTasks } from "@/features/projects/tasks.api";
import { getProjectMembers } from "@/features/projects/projects.api";
import {
  ProjectTaskStatus,
  type ProjectMember,
  type ProjectTask,
} from "@/features/projects/types";

interface CardData {
  tasks: ProjectTask[];
  members: ProjectMember[];
}

// Loads a project's tasks and members and derives the card's numbers.
// `data` stays null while loading or if loading failed (the card shows "–").
export function useProjectStats(projectId: number) {
  const [data, setData] = useState<CardData | null>(null);

  useEffect(() => {
    let ignore = false;

    Promise.all([
      getTasks(projectId, { skipErrorToast: true }),
      getProjectMembers(projectId, { skipErrorToast: true }),
    ])
      .then(([tasks, members]) => {
        if (!ignore) setData({ tasks, members });
      })
      .catch(() => {
        // Leave data as null → the card keeps showing "–"
      });

    return () => {
      ignore = true;
    };
  }, [projectId]);

  const taskCount = data?.tasks.length ?? 0;
  const doneCount =
    data?.tasks.filter((task) => task.status === ProjectTaskStatus.Done)
      .length ?? 0;
  const percent =
    taskCount === 0 ? 0 : Math.floor((doneCount / taskCount) * 100);

  return { data, percent };
}
