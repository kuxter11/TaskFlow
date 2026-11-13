import { HelpCircle, LogOut, ChevronRight, ChevronLeft } from "lucide-react";

import "./Sidebar.css";
import { useState } from "react";
import { navigationItems, type PageId } from "../../../config/navigation";

interface SidebarProps {
  activeItem: string;
  onNavigate: (item: PageId) => void;
  onLogout: () => void;
}

export default function Sidebar({
  activeItem,
  onNavigate,
  onLogout,
}: SidebarProps) {
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
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              type="button"
              className={`sidebar-link ${isActive ? "active" : ""}`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <button type="button" className="sidebar-link">
          <HelpCircle size={19} />
          <span>Help & Support</span>
        </button>

        <button
          type="button"
          className="sidebar-link logout-link"
          onClick={onLogout}
        >
          <LogOut size={19} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
