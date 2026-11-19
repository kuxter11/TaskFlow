import { useState, type SyntheticEvent } from "react";
import { isAxiosError } from "axios";

import "../Projects/CreateProjectModal.css";
import Button from "../../common/Button";
import { updateTask } from "../../../api/tasks.api";
import {
  ProjectTaskStatus,
  taskStatuses,
  type ProjectTask,
} from "../../../types/task.types";
import type { ProjectMember } from "../../../types/project.types";
import { useAppSelector } from "../../../store/hooks";

interface TaskModalProps {
  task: ProjectTask;
  members: ProjectMember[];
  onClose: () => void;
  onUpdated: (task: ProjectTask) => void;
}

export default function TaskModal({
  task,
  members,
  onClose,
  onUpdated,
}: TaskModalProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<ProjectTaskStatus>(task.status);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentUserId = useAppSelector((state) => state.auth.user?.id);
  const [assigneeId, setAssigneeId] = useState(task.assigneeId ?? "");

  const canAssignToMe =
    currentUserId !== undefined &&
    members.some((m) => m.userId === currentUserId);

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

  return (
    <div className="modal-overlay">
      <div
        className="create-project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-task-title"
      >
        <div className="modal-header">
          <div>
            <h2 id="edit-task-title">Edit Task</h2>
            <p>Change the details or move the task to another column.</p>
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-form">
            <label htmlFor="edit-task-title-input">Title</label>
            <input
              id="edit-task-title-input"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={200}
              required
            />

            <label htmlFor="edit-task-description">Description</label>
            <textarea
              id="edit-task-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
            />

            <label htmlFor="edit-task-status">Status</label>
            <select
              id="edit-task-status"
              value={status}
              onChange={(event) =>
                setStatus(Number(event.target.value) as ProjectTaskStatus)
              }
            >
              {taskStatuses.map((option) => (
                <option key={option.status} value={option.status}>
                  {option.title}
                </option>
              ))}
            </select>

            <label htmlFor="edit-task-assignee">Assignee</label>
            <select
              id="edit-task-assignee"
              value={assigneeId}
              onChange={(event) => setAssigneeId(event.target.value)}
            >
              <option value="">Unassigned</option>
              {members.map((member) => (
                <option key={member.userId} value={member.userId}>
                  {member.username}
                </option>
              ))}
            </select>

            {canAssignToMe && assigneeId !== currentUserId && (
              <button
                type="button"
                className="assign-to-me"
                onClick={() => setAssigneeId(currentUserId)}
              >
                Assign to me
              </button>
            )}
          </div>

          {error && <p className="modal-error">{error}</p>}

          <div className="modal-actions">
            <Button
              variant="secondary"
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button
              variant="primary"
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
