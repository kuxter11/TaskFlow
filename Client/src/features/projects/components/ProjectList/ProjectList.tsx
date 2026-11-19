import type { Project } from "@/features/projects/types";
import ProjectCard from "@/features/projects/components/ProjectCard/ProjectCard";
import EmptyProjects from "@/features/projects/components/EmptyProjects/EmptyProjects";
import styles from "./ProjectList.module.css";

interface ProjectListProps {
  projects: Project[];
  isLoading: boolean;
}

export default function ProjectList({ projects, isLoading }: ProjectListProps) {
  if (isLoading) {
    return <p>Loading projects...</p>;
  }

  if (projects.length === 0) {
    return <EmptyProjects />;
  }

  return (
    <div className={styles.list}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
