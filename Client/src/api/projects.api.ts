import api from "./axios";
import type {
  Project,
  CreateProjectData,
  ProjectMember,
} from "../types/project.types";
import type { AxiosRequestConfig } from "axios";

export async function getProjects(): Promise<Project[]> {
  const response = await api.get<Project[]>("/Project");

  return response.data;
}

export async function getProjectById(
  id: number,
  config?: AxiosRequestConfig,
): Promise<Project> {
  const response = await api.get<Project>(`/Project/${id}`, config);

  return response.data;
}

export async function createProject(data: CreateProjectData): Promise<Project> {
  const response = await api.post<Project>("/Project/create", data);

  return response.data;
}

export async function getProjectMembers(
  id: number,
  config?: AxiosRequestConfig,
): Promise<ProjectMember[]> {
  const response = await api.get<ProjectMember[]>(
    `/Project/${id}/members`,
    config,
  );
  return response.data;
}
