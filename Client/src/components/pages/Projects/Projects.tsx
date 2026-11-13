import { useEffect, useState } from "react";
import { fetchProjects } from "../../../features/projects/projectsSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { UserRole } from "../../../types/role.types";
import Button from "../../common/Button";
import { FolderOpen, Plus } from "lucide-react";
import "./Projects.css";
import CreateProjectModal from "./CreateProjectModal";

export default function Projects() {
  const dispatch = useAppDispatch();

  const { projects, isLoading, error } = useAppSelector(
    (state) => state.projects,
  );

  const user = useAppSelector((state) => state.auth.user);

  const canCreateProject =
    user?.role === UserRole.ProjectManager || user?.role === UserRole.Admin;

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h1>Projects</h1>

        {canCreateProject && (
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} />
            Create Project
          </Button>
        )}
      </div>

      {isLoading ? (
        <p>Loading projects...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : projects.length === 0 ? (
        <div className="empty-projects">
          <FolderOpen size={110} strokeWidth={1.2} />
          <h2>No projects yet</h2>
          <p>You don't have any projects at the moment. Check back later!</p>
        </div>
      ) : (
        <div className="projects-list">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      )}

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
