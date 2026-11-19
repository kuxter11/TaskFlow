// Fake content of the dashboard preview in the hero section.

export const previewSidebarItems = [
  { label: "Dashboard", active: true },
  { label: "Projects", active: false },
  { label: "Team", active: false },
  { label: "Calendar", active: false },
];

export const previewStats = [
  { label: "Active Projects", value: 12 },
  { label: "Completed Tasks", value: 48 },
];

export const previewProjects = [
  { name: "Website Redesign", percent: 75, color: "primary" },
  { name: "Mobile Application", percent: 40, color: "success" },
] as const;
