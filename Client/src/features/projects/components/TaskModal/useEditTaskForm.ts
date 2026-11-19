import { useState, type SyntheticEvent } from "react";
import { isAxiosError } from "axios";
import { updateTask } from "@/features/projects/tasks.api";
import type { ProjectTask, ProjectTaskStatus } from "@/features/projects/types";

// Form state and save logic of the TaskModal (edit an existing task).
export function useEditTaskForm(
  task: ProjectTask,
  onUpdated: (task: ProjectTask) => void,
  onClose: () => void,
) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<ProjectTaskStatus>(task.status);
  const [assigneeId, setAssigneeId] = useState(task.assigneeId ?? "");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);
    setIsSubmitting(true);

    try {
      const updated = await updateTask(task.projectId, task.id, {
        title: title.trim(),
        description: description.trim(),
        status,
        assigneeId: assigneeId || null,
      });

      onUpdated(updated);
      onClose();
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 400) {
        setError(
          err.response.data?.message ??
            "Please check the task title and try again.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values: { title, description, status, assigneeId },
    setTitle,
    setDescription,
    setStatus,
    setAssigneeId,
    isSubmitting,
    error,
    handleSubmit,
  };
}
