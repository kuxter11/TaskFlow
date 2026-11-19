import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { getProjectMembers } from "@/api/projects.api";
import { getTasks } from "@/api/tasks.api";
import type {
  ProjectMember,
  ProjectOutletContext,
} from "@/types/project.types";
import type { ProjectTask } from "@/types/task.types";
import BoardView from "./BoardView";

interface LoadResult {
  projectId: number;
  tasks: ProjectTask[];
  members: ProjectMember[];
  failed: boolean;
}

export default function ProjectBoard() {
  const { project } = useOutletContext<ProjectOutletContext>();
  const id = project.id;

  const [result, setResult] = useState<LoadResult | null>(null);

  useEffect(() => {
    let ignore = false;

    Promise.all([
      getTasks(id, { skipErrorToast: true }),
      getProjectMembers(id, { skipErrorToast: true }),
    ])
      .then(([tasks, members]) => {
        if (!ignore)
          setResult({ projectId: id, tasks, members, failed: false });
      })
      .catch(() => {
        if (!ignore)
          setResult({ projectId: id, tasks: [], members: [], failed: true });
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (result === null || result.projectId !== id) {
    return <p>Loading board...</p>;
  }

  if (result.failed) {
    return <p>Failed to load the board.</p>;
  }

  return (
    <BoardView
      key={id}
      project={project}
      initialTasks={result.tasks}
      members={result.members}
    />
  );
}
