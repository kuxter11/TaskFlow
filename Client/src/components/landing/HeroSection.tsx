import type { AuthMode } from "../../types/auth.types";
import "./HeroSection.css";

interface HeroSectionProps {
  onOpenAuth: (mode: AuthMode) => void;
}

export default function HeroSection({ onOpenAuth }: HeroSectionProps) {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <span className="hero-label">PROJECT MANAGEMENT MADE SIMPLE</span>

        <h1>
          Your projects.
          <br />
          Your team.
          <br />
          <span>One place.</span>
        </h1>

        <p>
          Plan smarter, collaborate effortlessly, and keep every project moving
          forward with TaskFlow.
        </p>

        <div className="hero-actions">
          <button
            type="button"
            className="hero-primary-button"
            onClick={() => onOpenAuth("register")}
          >
            Get Started
          </button>

          <a href="#features" className="hero-secondary-button">
            Explore Features
          </a>
        </div>

        <div className="hero-note">
          Everything your team needs to stay organized.
        </div>
      </div>

      <div className="hero-preview">
        <div className="preview-window">
          <div className="preview-header">
            <div className="preview-logo">
              <span>M</span>
              TaskFlow
            </div>

            <div className="preview-avatar">JD</div>
          </div>

          <div className="preview-body">
            <div className="preview-sidebar">
              <div className="preview-sidebar-item active">Dashboard</div>
              <div className="preview-sidebar-item">Projects</div>
              <div className="preview-sidebar-item">Team</div>
              <div className="preview-sidebar-item">Calendar</div>
            </div>

            <div className="preview-main">
              <h3>Welcome back, John!</h3>
              <p>Here's what's happening with your projects.</p>

              <div className="preview-stats">
                <div className="preview-stat">
                  <span>Active Projects</span>
                  <strong>12</strong>
                </div>

                <div className="preview-stat">
                  <span>Completed Tasks</span>
                  <strong>48</strong>
                </div>
              </div>

              <div className="preview-project">
                <div className="preview-project-heading">
                  <strong>Website Redesign</strong>
                  <span>75%</span>
                </div>

                <div className="preview-progress">
                  <div />
                </div>

                <span className="preview-project-caption">
                  Project progress
                </span>
              </div>

              <div className="preview-project">
                <div className="preview-project-heading">
                  <strong>Mobile Application</strong>
                  <span>40%</span>
                </div>

                <div className="preview-progress">
                  <div className="progress-secondary" />
                </div>

                <span className="preview-project-caption">
                  Project progress
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-floating-card">
          <span className="floating-card-icon">✓</span>
          <div>
            <strong>Task completed!</strong>
            <span>Your team is making progress.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
