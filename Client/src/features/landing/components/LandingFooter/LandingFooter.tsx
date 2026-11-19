import { footerLinkGroups } from "./LandingFooter.data";
import styles from "./LandingFooter.module.css";

export default function LandingFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <a href="#" className={styles.logo}>
            <span className={styles.logoIcon}>M</span>
            TaskFlow
          </a>

          <p className={styles.tagline}>
            Bring your projects and your team together. Make every day more
            productive with TaskFlow.
          </p>
        </div>

        <div className={styles.links}>
          {footerLinkGroups.map((group) => (
            <div key={group.title} className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>{group.title}</h4>
              {group.links.map((link) => (
                <a key={link.href} href={link.href} className={styles.link}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} TaskFlow. All rights reserved.</span>
        <span>Made for better teamwork.</span>
      </div>
    </footer>
  );
}
