import styles from "./HeroContent.module.css";

interface HeroContentProps {
  onGetStarted: () => void;
}

export default function HeroContent({ onGetStarted }: HeroContentProps) {
  return (
    <div className={styles.content}>
      <span className={styles.label}>PROJECT MANAGEMENT MADE SIMPLE</span>

      <h1 className={styles.title}>
        Your projects.
        <br />
        Your team.
        <br />
        <span className={styles.highlight}>One place.</span>
      </h1>

      <p className={styles.text}>
        Plan smarter, collaborate effortlessly, and keep every project moving
        forward with TaskFlow.
      </p>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.button} ${styles.primary}`}
          onClick={onGetStarted}
        >
          Get Started
        </button>

        <a href="#features" className={`${styles.button} ${styles.secondary}`}>
          Explore Features
        </a>
      </div>

      <div className={styles.note}>
        Everything your team needs to stay organized.
      </div>
    </div>
  );
}
