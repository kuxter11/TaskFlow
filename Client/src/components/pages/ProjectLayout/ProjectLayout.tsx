import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router";
import { isAxiosError } from "axios";
import { getProjectById } from "@/api/projects.api";
import type {
  Project,
  ProjectOutletContext,
} from "@/types/project.types";
import "./ProjectLayout.css";

interface LoadResult {
  projectId: number;
  project: Project | null;
  error: string | null;
}

const tabs = [
  { path: "board", label: "Board" },
  { path: "members", label: "Project Members" },
  { path: "calendar", label: "Calendar" },
];

export default function ProjectLayout() {
  const { projectId } = useParams();
  const id = Number(projectId);

  const [result, setResult] = useState<LoadResult | null>(null);

  useEffect(() => {
    if (Number.isNaN(id)) return;

    let ignore = false;

    getProjectById(id, { skipErrorToast: true })
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

  const context: ProjectOutletContext = { project: result.project };

  return (
    <div className="project-page">
      <header className="project-header">
        <h1>{result.project.name}</h1>
        <p>{result.project.description}</p>
      </header>

      <nav className="project-tabs">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `project-tab ${isActive ? "active" : ""}`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      <Outlet context={context} />
    </div>
  );
}
