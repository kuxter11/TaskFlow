import { NavLink } from "react-router";
import { projectTabs } from "./ProjectTabs.data";
import styles from "./ProjectTabs.module.css";

export default function ProjectTabs() {
  return (
    <nav className={styles.tabs}>
      {projectTabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            isActive ? `${styles.tab} ${styles.active}` : styles.tab
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
