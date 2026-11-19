import { Draggable } from "@hello-pangea/dnd";
import type { ProjectMember, ProjectTask } from "@/features/projects/types";
import TaskAssignee from "./TaskAssignee";
import styles from "./TaskCard.module.css";

interface TaskCardProps {
  task: ProjectTask;
  /** Position in its column (needed by drag & drop). */
  index: number;
  members: ProjectMember[];
  onSelect: (task: ProjectTask) => void;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export default function TaskCard({
  task,
  index,
  members,
  onSelect,
}: TaskCardProps) {
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <article
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={
            snapshot.isDragging
              ? `${styles.card} ${styles.dragging}`
              : styles.card
          }
          onClick={() => onSelect(task)}
          onKeyDown={(event) => {
            if (event.key === "Enter") onSelect(task);
          }}
        >
          <h3 className={styles.title}>{task.title}</h3>
          {task.description && (
            <p className={styles.description}>{task.description}</p>
          )}

          <div className={styles.footer}>
            <span className={styles.meta}>
              #{task.id} · {formatDate(task.createdAt)}
            </span>

            <TaskAssignee assigneeId={task.assigneeId} members={members} />
          </div>
        </article>
      )}
    </Draggable>
  );
}
