import { Link } from "react-router";
import { FolderKanban, Layers } from "lucide-react";
import type { Project } from "@/features/projects/types";
import AvatarStack from "@/features/projects/components/AvatarStack/AvatarStack";
import { useProjectStats } from "./useProjectStats";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { data, percent } = useProjectStats(project.id);

  return (
    <Link to={`/projects/${project.id}`} className={styles.card}>
      <div className={styles.icon}>
        <FolderKanban size={24} />
      </div>

      <h3 className={styles.clamp}>{project.name}</h3>
      <p className={styles.clamp}>{project.description}</p>

      <div className={styles.footer}>
        <span className={styles.tasks}>
          <Layers size={16} />
          {data ? `${data.tasks.length} tasks` : "–"}
        </span>

        <div className={styles.progress}>
          <div
            className={styles.progressFill}
            style={{ width: `${percent}%` }}
          />
        </div>

        <span className={styles.progressLabel}>
          {data ? `${percent}%` : "–"}
        </span>

        {data && <AvatarStack members={data.members} />}
      </div>
    </Link>
  );
}
