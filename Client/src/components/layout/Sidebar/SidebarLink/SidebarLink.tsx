import type { ReactNode } from "react";
import { NavLink } from "react-router";
import styles from "./SidebarLink.module.css";

interface SidebarLinkProps {
  icon: ReactNode;
  label: string;
  isCollapsed: boolean;
  /** With `to` it renders a router link, otherwise a button. */
  to?: string;
  onClick?: () => void;
  variant?: "default" | "danger";
}

export default function SidebarLink({
  icon,
  label,
  isCollapsed,
  to,
  onClick,
  variant = "default",
}: SidebarLinkProps) {
  const className = [
    styles.link,
    isCollapsed && styles.collapsed,
    variant === "danger" && styles.danger,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon}
      <span className={styles.label}>{label}</span>
    </>
  );

  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? `${className} ${styles.active}` : className
        }
      >
        {content}
      </NavLink>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {content}
    </button>
  );
}
