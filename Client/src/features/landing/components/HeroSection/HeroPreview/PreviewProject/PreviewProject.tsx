import styles from "./PreviewProject.module.css";

interface PreviewProjectProps {
  name: string;
  percent: number;
  color: "primary" | "success";
}

// One fake project with a progress bar inside the hero preview.
export default function PreviewProject({
  name,
  percent,
  color,
}: PreviewProjectProps) {
  return (
    <div className={styles.project}>
      <div className={styles.heading}>
        <strong>{name}</strong>
        <span className={styles.percent}>{percent}%</span>
      </div>

      <div className={styles.progress}>
        <div
          className={`${styles.fill} ${styles[color]}`}
          // Width comes from data → inline style is allowed.
          style={{ width: `${percent}%` }}
        />
      </div>

      <span className={styles.caption}>Project progress</span>
    </div>
  );
}
