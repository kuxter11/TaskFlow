import { useId, useState, type SyntheticEvent } from "react";
import { useAppDispatch } from "@/app/hooks";
import Modal from "@/components/ui/Modal/Modal";
import Button from "@/components/ui/Button/Button";
import { addProject } from "@/features/projects/projectsSlice";
import FormField from "@/features/projects/components/FormField/FormField";
import FormError from "@/features/projects/components/FormError/FormError";
import styles from "./CreateProjectModal.module.css";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateProjectModal({
  isOpen,
  onClose,
}: CreateProjectModalProps) {
  const dispatch = useAppDispatch();
  const formId = useId();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    setName("");
    setDescription("");
    setError(null);
    onClose();
  };

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      closeDisabled={isSubmitting}
      title="Create Project"
      description="Start a new project for your team."
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
            Create Project
          </Button>
        </>
      }
    >
      <form id={formId} onSubmit={handleSubmit}>
        <div className={styles.fields}>
          <FormField
            id="project-name"
            label="Project name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Website Redesign"
            minLength={3}
            maxLength={50}
            required
          />

          <FormField
            as="textarea"
            id="project-description"
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe what this project is about..."
            rows={4}
          />
        </div>

        <FormError message={error} />
      </form>
    </Modal>
  );
}
