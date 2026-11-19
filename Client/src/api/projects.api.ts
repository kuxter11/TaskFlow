import api from "./axios";
import type {
  Project,
  CreateProjectData,
  ProjectMember,
} from "@/types/project.types";
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

export async function searchMemberCandidates(
  id: number,
  query: string,
  config?: AxiosRequestConfig,
): Promise<ProjectMember[]> {
  const response = await api.get<ProjectMember[]>(
    `/Project/${id}/members/candidates`,
    { ...config, params: { q: query } },
  );

  return response.data;
}

export async function addProjectMember(
  id: number,
  userId: string,
  config?: AxiosRequestConfig,
): Promise<ProjectMember> {
  const response = await api.post<ProjectMember>(
    `/Project/${id}/members`,
    { userId },
    config,
  );

  return response.data;
}

export async function removeProjectMember(
  id: number,
  userId: string,
  config?: AxiosRequestConfig,
): Promise<void> {
  await api.delete(`/Project/${id}/members/${userId}`, config);
}
