import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { isAxiosError } from "axios";
import { getProjectById, getProjectMembers } from "../../../api/projects.api";
import type { Project, ProjectMember } from "../../../types/project.types";
import type { ProjectTask } from "../../../types/task.types";
import "./ProjectBoard.css";
import { getTasks } from "../../../api/tasks.api";
import BoardView from "./BoardView";

interface LoadResult {
  projectId: number;
  project: Project | null;
  tasks: ProjectTask[];
  members: ProjectMember[];
  error: string | null;
}

export default function ProjectBoard() {
  const { projectId } = useParams();
  const id = Number(projectId);

  const [result, setResult] = useState<LoadResult | null>(null);

  useEffect(() => {
    if (Number.isNaN(id)) return;

    let ignore = false;

    Promise.all([
      getProjectById(id, { skipErrorToast: true }),
      getTasks(id, { skipErrorToast: true }),
      getProjectMembers(id, { skipErrorToast: true }),
    ])
      .then(([project, tasks, members]) => {
        if (!ignore)
          setResult({ projectId: id, project, tasks, members, error: null });
      })
      .catch((err) => {
        if (ignore) return;

        const notFound = isAxiosError(err) && err.response?.status === 404;

        setResult({
          projectId: id,
          project: null,
          tasks: [],
          members: [],
          error: notFound
            ? "Project not found, or you don't have access to it."
            : "Failed to load project.",
        });
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (Number.isNaN(id)) {
    return <h1>Project not found</h1>;
  }

  if (result === null || result.projectId !== id) {
    return <p>Loading project...</p>;
  }

  if (result.error || !result.project) {
    return (
      <>
        <h1>Oops</h1>
        <p>{result.error}</p>
        <Link to="/projects">Back to projects</Link>
      </>
    );
  }

  return (
    <BoardView
      key={id}
      project={result.project}
      initialTasks={result.tasks}
      members={result.members}
    />
  );
}
