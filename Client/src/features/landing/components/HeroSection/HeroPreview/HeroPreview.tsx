import PreviewProject from "./PreviewProject/PreviewProject";
import HeroFloatingCard from "./HeroFloatingCard/HeroFloatingCard";
import {
  previewProjects,
  previewSidebarItems,
  previewStats,
} from "./HeroPreview.data";
import styles from "./HeroPreview.module.css";

// A static, slightly tilted picture of the app (pure decoration).
export default function HeroPreview() {
  return (
    <div className={styles.preview}>
      <div className={styles.window}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>M</span>
            TaskFlow
          </div>

          <div className={styles.avatar}>JD</div>
        </div>

        <div className={styles.body}>
          <div className={styles.sidebar}>
            {previewSidebarItems.map((item) => (
              <div
                key={item.label}
                className={
                  item.active
                    ? `${styles.sidebarItem} ${styles.active}`
                    : styles.sidebarItem
                }
              >
                {item.label}
              </div>
            ))}
          </div>

          <div className={styles.main}>
            <h3 className={styles.title}>Welcome back, John!</h3>
            <p className={styles.subtitle}>
              Here's what's happening with your projects.
            </p>

            <div className={styles.stats}>
              {previewStats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <span className={styles.statLabel}>{stat.label}</span>
                  <strong className={styles.statValue}>{stat.value}</strong>
                </div>
              ))}
            </div>

            {previewProjects.map((project) => (
              <PreviewProject
                key={project.name}
                name={project.name}
                percent={project.percent}
                color={project.color}
              />
            ))}
          </div>
        </div>
      </div>

      <HeroFloatingCard />
    </div>
  );
}
