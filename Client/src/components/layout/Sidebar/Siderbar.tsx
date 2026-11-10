import {
  LayoutDashboard,
  Settings,
  HelpCircle,
  LogOut,
  Folders,
  UserGroup,
  CalendarDays,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import "./Sidebar.css";
import { useState } from "react";

interface SidebarProps {
  activeItem: string;
  onNavigate: (item: string) => void;
}

const navigationItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Projects", icon: Folders },
  { label: "Team", icon: UserGroup },
  { label: "Calendar", icon: CalendarDays },
  { label: "Settings", icon: Settings },
];

export default function Sidebar({ activeItem, onNavigate }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((previous) => !previous);
  };

  return (
    <aside className={`sidebar ${isCollapsed ? "sidebar--collapsed" : ""}`}>
      <button
        type="button"
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-expanded={!isCollapsed}
      >
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      <div className="sidebar-brand">
        <div className="brand-logo">M</div>
        <span>TaskFlow</span>
      </div>

      <div className="sidebar-section-label">MAIN MENU</div>

      <nav className="sidebar-nav">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;

          return (
            <button
              key={item.label}
              type="button"
              className={`sidebar-link ${isActive ? "active" : ""}`}
              onClick={() => onNavigate(item.label)}
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <button
          type="button"
          className="sidebar-link"
          onClick={() => onNavigate("Help")}
        >
          <HelpCircle size={19} />
          <span>Help & Support</span>
        </button>

        <button
          type="button"
          className="sidebar-link logout-link"
          onClick={() => onNavigate("Logout")}
        >
          <LogOut size={19} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
