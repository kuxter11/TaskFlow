import { useId, useState, type SyntheticEvent } from "react";
import { isAxiosError } from "axios";
import Modal from "@/components/ui/Modal/Modal";
import Button from "@/components/ui/Button/Button";
import { createTask } from "@/features/projects/tasks.api";
import type { ProjectTask } from "@/features/projects/types";
import FormField from "@/features/projects/components/FormField/FormField";
import FormError from "@/features/projects/components/FormError/FormError";
import styles from "./CreateTaskModal.module.css";

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
  const formId = useId();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      closeDisabled={isSubmitting}
      title="Add Task"
      description="Create a new task in the To Do column."
      footer={
        <>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            type="submit"
            form={formId}
            isLoading={isSubmitting}
          >
            Add Task
          </Button>
        </>
      }
    >
      <form id={formId} onSubmit={handleSubmit}>
        <div className={styles.fields}>
          <FormField
            id="task-title"
            label="Title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Design the login page"
            maxLength={200}
            required
          />

          <FormField
            as="textarea"
            id="task-description"
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Optional details..."
            rows={4}
          />
        </div>

        <FormError message={error} />
      </form>
    </Modal>
  );
}
