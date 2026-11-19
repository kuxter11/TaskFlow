import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  label: string;
  title: ReactNode;
  description: ReactNode;
}

// Small purple label, big title, grey text – centered above a landing section.
export default function SectionHeading({
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className={styles.heading}>
      <span className={styles.label}>{label}</span>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
