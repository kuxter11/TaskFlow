export const ProjectTaskStatus = {
  ToDo: 1,
  InProgress: 2,
  Done: 3,
} as const;

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
}

export interface CreateTaskData {
  title: string;
  description: string;
}

export interface UpdateTaskData {
  title: string;
  description: string;
  status: ProjectTaskStatus;
}
