import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { isAxiosError } from "axios";
import { getProjectById } from "../../../api/projects.api";
import type { Project } from "../../../types/project.types";

interface LoadResult {
  projectId: number;
  project: Project | null;
  error: string | null;
}

export default function ProjectBoard() {
  const { projectId } = useParams();
  const id = Number(projectId);

  const [result, setResult] = useState<LoadResult | null>(null);

  useEffect(() => {
    if (Number.isNaN(id)) return;

    let ignore = false;

    getProjectById(id)
      .then((project) => {
        if (!ignore) setResult({ projectId: id, project, error: null });
      })
      .catch((err) => {
        if (ignore) return;

        const notFound = isAxiosError(err) && err.response?.status === 404;

        setResult({
          projectId: id,
          project: null,
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
    <div>
      <h1>{result.project.name}</h1>
      <p>{result.project.description}</p>
      {/* the board columns will go here later */}
    </div>
  );
}
