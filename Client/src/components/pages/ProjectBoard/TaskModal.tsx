import { useState, type SyntheticEvent } from "react";
import { isAxiosError } from "axios";

import "../Projects/CreateProjectModal.css";
import Button from "../../common/Button";
import { updateTask } from "../../../api/tasks.api";
import { ProjectTaskStatus, type ProjectTask } from "../../../types/task.types";

interface TaskModalProps {
  task: ProjectTask;
  onClose: () => void;
  onUpdated: (task: ProjectTask) => void;
}

const statusOptions = [
  { value: ProjectTaskStatus.ToDo, label: "To Do" },
  { value: ProjectTaskStatus.InProgress, label: "In Progress" },
  { value: ProjectTaskStatus.Done, label: "Done" },
];

export default function TaskModal({
  task,
  onClose,
  onUpdated,
}: TaskModalProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<ProjectTaskStatus>(task.status);
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
      });

      onUpdated(updated);
      onClose();
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 400) {
        setError("Please check the task title and try again.");
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
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
