// ---------- Projects ----------

export interface Project {
  id: number;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
}

export interface CreateProjectData {
  name: string;
  description: string;
}

export interface ProjectMember {
  userId: string;
  username: string;
  email: string;
}

export interface ProjectOutletContext {
  project: Project;
}

// ---------- Tasks ----------

export const ProjectTaskStatus = {
  ToDo: 1,
  InProgress: 2,
  Testing: 3,
  Done: 4,
} as const;

export const taskStatuses = [
  { status: ProjectTaskStatus.ToDo, title: "To Do" },
  { status: ProjectTaskStatus.InProgress, title: "In Progress" },
  { status: ProjectTaskStatus.Testing, title: "Testing" },
  { status: ProjectTaskStatus.Done, title: "Done" },
];

export type ProjectTaskStatus =
  (typeof ProjectTaskStatus)[keyof typeof ProjectTaskStatus];

export interface ProjectTask {
  id: number;
  projectId: number;
  title: string;
  description: string;
  status: ProjectTaskStatus;
  createdBy: string;
  createdAt: string;
  assigneeId: string | null;
}

export interface CreateTaskData {
  title: string;
  description: string;
}

export interface UpdateTaskData {
  title: string;
  description: string;
  status: ProjectTaskStatus;
  assigneeId: string | null;
}
