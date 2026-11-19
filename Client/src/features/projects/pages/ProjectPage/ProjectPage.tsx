import { Link, Outlet, useParams } from "react-router";
import type { ProjectOutletContext } from "@/features/projects/types";
import ProjectTabs from "@/features/projects/components/ProjectTabs/ProjectTabs";
import { useProject } from "./useProject";
import styles from "./ProjectPage.module.css";

// Shell for one project: name, description, tabs, and the active tab below.
export default function ProjectPage() {
  const { projectId } = useParams();
  const id = Number(projectId);

  const result = useProject(id);

  if (Number.isNaN(id)) {
    return <h1>Project not found</h1>;
  }

  if (result === null) {
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
    <div>
      <header className={styles.header}>
        <h1>{result.project.name}</h1>
        <p className={styles.description}>{result.project.description}</p>
      </header>

      <ProjectTabs />

      <Outlet context={context} />
    </div>
  );
}
