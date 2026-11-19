import { useState, type SyntheticEvent } from "react";
import { isAxiosError } from "axios";

import "@/components/pages/Projects/CreateProjectModal.css";
import Button from "@/components/common/Button";
import type { ProjectTask } from "@/types/task.types";
import { createTask } from "@/api/tasks.api";

interface CreateTaskModalProps {
  isOpen: boolean;
  projectId: number;
  onClose: () => void;
  onCreated: (task: ProjectTask) => void;
}

export default function CreateTaskModal({
  isOpen,
  projectId,
  onClose,
  onCreated,
}: CreateTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setError(null);
    onClose();
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);
    setIsSubmitting(true);

    try {
      const task = await createTask(projectId, {
        title: title.trim(),
        description: description.trim(),
      });

      onCreated(task);
      handleClose();
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
        aria-labelledby="create-task-title"
      >
        <div className="modal-header">
          <div>
            <h2 id="create-task-title">Add Task</h2>
            <p>Create a new task in the To Do column.</p>
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-form">
            <label htmlFor="task-title">Title</label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Design the login page"
              maxLength={200}
              required
            />

            <label htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Optional details..."
              rows={4}
            />
          </div>

          {error && <p className="modal-error">{error}</p>}

          <div className="modal-actions">
            <Button
              variant="secondary"
              type="button"
              onClick={handleClose}
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
              Add Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
