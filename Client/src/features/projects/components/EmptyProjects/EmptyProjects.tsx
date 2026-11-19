import { FolderOpen } from "lucide-react";
import styles from "./EmptyProjects.module.css";

export default function EmptyProjects() {
  return (
    <div className={styles.empty}>
      <FolderOpen className={styles.icon} size={110} strokeWidth={1.2} />
      <h2 className={styles.title}>No projects yet</h2>
      <p className={styles.text}>
        You don't have any projects at the moment. Check back later!
      </p>
    </div>
  );
}
