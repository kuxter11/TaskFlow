import { LayoutDashboard, FolderKanban, Settings } from "lucide-react";

// Main menu items in the sidebar.
export const navigationItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    label: "Projects",
    icon: FolderKanban,
    path: "/projects",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
];
