import { useId } from "react";
import { useAppSelector } from "@/app/hooks";
import Modal from "@/components/ui/Modal/Modal";
import Button from "@/components/ui/Button/Button";
import {
  taskStatuses,
  type ProjectMember,
  type ProjectTask,
  type ProjectTaskStatus,
} from "@/features/projects/types";
import FormField from "@/features/projects/components/FormField/FormField";
import FormError from "@/features/projects/components/FormError/FormError";
import { useEditTaskForm } from "./useEditTaskForm";
import styles from "./TaskModal.module.css";

interface TaskModalProps {
  task: ProjectTask;
  members: ProjectMember[];
  onClose: () => void;
  onUpdated: (task: ProjectTask) => void;
}

// Edit a task. Rendered only while a task is selected, so it's always open.
export default function TaskModal({
  task,
  members,
  onClose,
  onUpdated,
}: TaskModalProps) {
  const formId = useId();
  const form = useEditTaskForm(task, onUpdated, onClose);

  const currentUserId = useAppSelector((state) => state.auth.user?.id);
  const canAssignToMe =
    currentUserId !== undefined &&
    members.some((m) => m.userId === currentUserId);

  return (
    <Modal
      isOpen
      onClose={onClose}
      closeDisabled={form.isSubmitting}
      title="Edit Task"
      description="Change the details or move the task to another column."
      footer={
        <>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={form.isSubmitting}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            type="submit"
            form={formId}
            isLoading={form.isSubmitting}
          >
            Save
          </Button>
        </>
      }
    >
      <form id={formId} onSubmit={form.handleSubmit}>
        <div className={styles.fields}>
          <FormField
            id="edit-task-title-input"
            label="Title"
            type="text"
            value={form.values.title}
            onChange={(event) => form.setTitle(event.target.value)}
            maxLength={200}
            required
          />

          <FormField
            as="textarea"
            id="edit-task-description"
            label="Description"
            value={form.values.description}
            onChange={(event) => form.setDescription(event.target.value)}
            rows={4}
          />

          <FormField
            as="select"
            id="edit-task-status"
            label="Status"
            value={form.values.status}
            onChange={(event) =>
              form.setStatus(Number(event.target.value) as ProjectTaskStatus)
            }
          >
            {taskStatuses.map((option) => (
              <option key={option.status} value={option.status}>
                {option.title}
              </option>
            ))}
          </FormField>

          <FormField
            as="select"
            id="edit-task-assignee"
            label="Assignee"
            value={form.values.assigneeId}
            onChange={(event) => form.setAssigneeId(event.target.value)}
          >
            <option value="">Unassigned</option>
            {members.map((member) => (
              <option key={member.userId} value={member.userId}>
                {member.username}
              </option>
            ))}
          </FormField>

          {canAssignToMe && form.values.assigneeId !== currentUserId && (
            <button
              type="button"
              className={styles.assignToMe}
              onClick={() => form.setAssigneeId(currentUserId)}
            >
              Assign to me
            </button>
          )}
        </div>

        <FormError message={form.error} />
      </form>
    </Modal>
  );
}
