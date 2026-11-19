import type { AxiosRequestConfig } from "axios";
import type {
  CreateTaskData,
  ProjectTask,
  ProjectTaskStatus,
  UpdateTaskData,
} from "@/types/task.types";
import api from "./axios";

export async function getTasks(projectId: number, config?: AxiosRequestConfig) {
  const response = await api.get<ProjectTask[]>(
    `/Project/${projectId}/tasks`,
    config,
  );

  return response.data;
}

export async function createTask(
  projectId: number,
  data: CreateTaskData,
): Promise<ProjectTask> {
  const response = await api.post<ProjectTask>(
    `/Project/${projectId}/tasks`,
    data,
  );

  return response.data;
}

export async function updateTask(
  projectId: number,
  taskId: number,
  data: UpdateTaskData,
): Promise<ProjectTask> {
  const response = await api.put<ProjectTask>(
    `/Project/${projectId}/tasks/${taskId}`,
    data,
  );

  return response.data;
}

export async function updateTaskStatus(
  projectId: number,
  taskId: number,
  status: ProjectTaskStatus,
): Promise<ProjectTask> {
  const response = await api.patch<ProjectTask>(
    `/Project/${projectId}/tasks/${taskId}/status`,
    { status },
  );

  return response.data;
}
