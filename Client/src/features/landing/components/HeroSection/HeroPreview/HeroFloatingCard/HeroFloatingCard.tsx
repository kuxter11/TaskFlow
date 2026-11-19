import styles from "./HeroFloatingCard.module.css";

// "Task completed!" notification floating over the hero preview.
export default function HeroFloatingCard() {
  return (
    <div className={styles.card}>
      <span className={styles.icon}>✓</span>
      <div className={styles.text}>
        <strong className={styles.title}>Task completed!</strong>
        <span className={styles.subtitle}>Your team is making progress.</span>
      </div>
    </div>
  );
}
