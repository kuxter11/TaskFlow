import { useState } from "react";
import { HelpCircle, LogOut, ChevronRight, ChevronLeft } from "lucide-react";
import { navigationItems } from "@/config/navigation";
import SidebarLink from "./SidebarLink/SidebarLink";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((previous) => !previous);
  };

  return (
    <aside
      className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}
    >
      <button
        type="button"
        className={styles.toggle}
        onClick={toggleSidebar}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-expanded={!isCollapsed}
      >
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      <div className={styles.brand}>
        <div className={styles.logo}>M</div>
        <span className={styles.brandName}>TaskFlow</span>
      </div>

      <div className={styles.sectionLabel}>MAIN MENU</div>

      <nav className={styles.nav}>
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <SidebarLink
              key={item.path}
              to={item.path}
              icon={<Icon size={19} strokeWidth={1.8} />}
              label={item.label}
              isCollapsed={isCollapsed}
            />
          );
        })}
      </nav>

      <div className={styles.bottom}>
        <SidebarLink
          icon={<HelpCircle size={19} />}
          label="Help & Support"
          isCollapsed={isCollapsed}
        />

        <SidebarLink
          icon={<LogOut size={19} />}
          label="Log out"
          variant="danger"
          isCollapsed={isCollapsed}
          onClick={onLogout}
        />
      </div>
    </aside>
  );
}
