import { useState, type SyntheticEvent } from "react";

import "./CreateProjectModal.css";
import Button from "../../common/Button";
import { useAppDispatch } from "../../../store/hooks";
import { addProject } from "../../../features/projects/projectsSlice";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateProjectModal({
  isOpen,
  onClose,
}: CreateProjectModalProps) {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);
    setIsSubmitting(true);

    try {
      await dispatch(
        addProject({
          name: name.trim(),
          description: description.trim(),
        }),
      ).unwrap();

      handleClose();
    } catch (error) {
      setError(typeof error === "string" ? error : "Failed to create project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    setError(null);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div
        className="create-project-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-project-title"
      >
        <div className="modal-header">
          <div>
            <h2 id="create-project-title">Create Project</h2>
            <p>Start a new project for your team.</p>
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
            <label htmlFor="project-name">Project name</label>
            <input
              id="project-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Website Redesign"
              minLength={3}
              maxLength={50}
              required
            />

            <label htmlFor="project-description">Description</label>
            <textarea
              id="project-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe what this project is about..."
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
              Create Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
