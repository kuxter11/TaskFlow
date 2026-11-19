import type { LucideIcon } from "lucide-react";
import styles from "./StepCard.module.css";

interface StepCardProps {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function StepCard({
  number,
  icon: Icon,
  title,
  description,
}: StepCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.number}>{number}</div>

      <div className={styles.icon}>
        <Icon size={27} strokeWidth={1.8} />
      </div>

      <h3 className={styles.title}>{title}</h3>

      <p className={styles.description}>{description}</p>
    </article>
  );
}
