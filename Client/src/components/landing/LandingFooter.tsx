import "./LandingFooter.css";

export default function LandingFooter() {
  return (
    <footer className="landing-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <a href="#" className="footer-logo">
            <span className="footer-logo-icon">M</span>
            TaskFlow
          </a>

          <p>
            Bring your projects and your team together. Make every day more
            productive with TaskFlow.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-link-group">
            <h4>Explore</h4>
            <a href="#features">Features</a>
            <a href="#about">How it works</a>
          </div>

          <div className="footer-link-group">
            <h4>Get Started</h4>
            <a href="#top">Back to top</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} TaskFlow. All rights reserved.</span>
        <span>Made for better teamwork.</span>
      </div>
    </footer>
  );
}
