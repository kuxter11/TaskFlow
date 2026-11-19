import type { AuthMode } from "@/types/auth.types";
import styles from "./CallToAction.module.css";

interface CallToActionProps {
  onOpenAuth: (mode: AuthMode) => void;
}

export default function CallToAction({ onOpenAuth }: CallToActionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <span className={styles.label}>LET'S GET STARTED</span>

        <h2 className={styles.title}>Ready to bring your team together?</h2>

        <p className={styles.text}>
          Make project management simpler. Start organizing your work and moving
          forward with TaskFlow.
        </p>

        <button
          type="button"
          className={styles.button}
          onClick={() => onOpenAuth("register")}
        >
          Create Your Free Account
        </button>
      </div>
    </section>
  );
}
