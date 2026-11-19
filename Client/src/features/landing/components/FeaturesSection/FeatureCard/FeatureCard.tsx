import type { LucideIcon } from "lucide-react";
import styles from "./FeatureCard.module.css";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.icon}>
        <Icon size={25} strokeWidth={1.8} />
      </div>

      <h3 className={styles.title}>{title}</h3>

      <p className={styles.description}>{description}</p>
    </article>
  );
}
