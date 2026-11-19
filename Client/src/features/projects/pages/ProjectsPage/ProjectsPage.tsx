import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchProjects } from "@/features/projects/projectsSlice";
import ProjectsHeader from "@/features/projects/components/ProjectsHeader/ProjectsHeader";
import ProjectList from "@/features/projects/components/ProjectList/ProjectList";
import CreateProjectModal from "@/features/projects/components/CreateProjectModal/CreateProjectModal";
import { useCanCreateProject } from "./useCanCreateProject";
import styles from "./ProjectsPage.module.css";

export default function ProjectsPage() {
  const dispatch = useAppDispatch();
  const { projects, isLoading } = useAppSelector((state) => state.projects);
  const canCreateProject = useCanCreateProject();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <ProjectsHeader
        canCreate={canCreateProject}
        onCreate={() => setIsModalOpen(true)}
      />

      <ProjectList projects={projects} isLoading={isLoading} />

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
