import type { AuthMode } from "../../types/auth.types";
import "./CallToAction.css";

interface CallToActionProps {
  onOpenAuth: (mode: AuthMode) => void;
}

export default function CallToAction({ onOpenAuth }: CallToActionProps) {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <span className="cta-label">LET'S GET STARTED</span>

        <h2>Ready to bring your team together?</h2>

        <p>
          Make project management simpler. Start organizing your work and moving
          forward with TaskFlow.
        </p>

        <button
          type="button"
          className="cta-button"
          onClick={() => onOpenAuth("register")}
        >
          Create Your Free Account
        </button>
      </div>
    </section>
  );
}
