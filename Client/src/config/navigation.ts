import { LayoutDashboard, FolderKanban, Settings } from "lucide-react";

export const Page = {
  Dashboard: "Dashboard",
  Projects: "Projects",
  Team: "Team",
  Calendar: "Calendar",
  Settings: "Settings",
} as const;

export type PageId = (typeof Page)[keyof typeof Page];

export const navigationItems = [
  {
    id: Page.Dashboard,
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: Page.Projects,
    label: "Projects",
    icon: FolderKanban,
    path: "/projects",
  },
  {
    id: Page.Settings,
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
];
