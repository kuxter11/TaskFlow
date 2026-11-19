import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FolderKanban, Layers } from "lucide-react";
import { getTasks } from "../../../api/tasks.api";
import { getProjectMembers } from "../../../api/projects.api";
import type { Project, ProjectMember } from "../../../types/project.types";
import { ProjectTaskStatus, type ProjectTask } from "../../../types/task.types";
import "./ProjectCard.css";
import AvatarStack from "../../common/AvatarStack";

interface ProjectCardProps {
  project: Project;
}

interface CardData {
  tasks: ProjectTask[];
  members: ProjectMember[];
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [data, setData] = useState<CardData | null>(null);

  const taskCount = data?.tasks.length ?? 0;
  const doneCount =
    data?.tasks.filter((task) => task.status === ProjectTaskStatus.Done)
      .length ?? 0;
  const percent =
    taskCount === 0 ? 0 : Math.floor((doneCount / taskCount) * 100);

  useEffect(() => {
    let ignore = false;

    Promise.all([
      getTasks(project.id, { skipErrorToast: true }),
      getProjectMembers(project.id, { skipErrorToast: true }),
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
  }, [project.id]);

  return (
    <Link to={`/projects/${project.id}`} className="project-card">
      <div className="project-card-icon">
        <FolderKanban size={24} />
      </div>

      <h3>{project.name}</h3>
      <p>{project.description}</p>

      <div className="project-card-footer">
        <span className="project-card-tasks">
          <Layers size={16} />
          {data ? `${data.tasks.length} tasks` : "–"}
        </span>
        <div className="project-progress">
          <div
            className="project-progress-fill"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="project-progress-label">
          {data ? `${percent}%` : "–"}
        </span>
        {data && <AvatarStack members={data.members} />}
      </div>
    </Link>
  );
}
