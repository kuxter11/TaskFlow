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
