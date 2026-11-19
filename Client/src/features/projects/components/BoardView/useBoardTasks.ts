import { useState } from "react";
import type { DropResult } from "@hello-pangea/dnd";
import { updateTaskStatus } from "@/features/projects/tasks.api";
import type { ProjectTask, ProjectTaskStatus } from "@/features/projects/types";

/**
 * The board's task list and how it changes:
 * add, replace, and move between columns by drag & drop.
 * Drag & drop updates the UI first (optimistic) and rolls back if the API call fails.
 */
export function useBoardTasks(projectId: number, initialTasks: ProjectTask[]) {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (task: ProjectTask) => {
    setTasks((previous) => [...previous, task]);
  };

  const replaceTask = (updated: ProjectTask) => {
    setTasks((previous) =>
      previous.map((t) => (t.id === updated.id ? updated : t)),
    );
  };

  const setTaskStatus = (taskId: number, status: ProjectTaskStatus) => {
    setTasks((previous) =>
      previous.map((t) => (t.id === taskId ? { ...t, status } : t)),
    );
  };

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;

    const taskId = Number(draggableId);
    const oldStatus = Number(source.droppableId) as ProjectTaskStatus;
    const newStatus = Number(destination.droppableId) as ProjectTaskStatus;

    setTaskStatus(taskId, newStatus);

    try {
      const updated = await updateTaskStatus(projectId, taskId, newStatus);
      replaceTask(updated);
    } catch {
      setTaskStatus(taskId, oldStatus);
    }
  };

  return { tasks, addTask, replaceTask, handleDragEnd };
}
