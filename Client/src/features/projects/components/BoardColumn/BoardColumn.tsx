import { Droppable } from "@hello-pangea/dnd";
import type {
  ProjectMember,
  ProjectTask,
  ProjectTaskStatus,
} from "@/features/projects/types";
import TaskCard from "@/features/projects/components/TaskCard/TaskCard";
import styles from "./BoardColumn.module.css";

interface BoardColumnProps {
  title: string;
  status: ProjectTaskStatus;
  tasks: ProjectTask[];
  members: ProjectMember[];
  onSelectTask: (task: ProjectTask) => void;
}

export default function BoardColumn({
  title,
  status,
  tasks,
  members,
  onSelectTask,
}: BoardColumnProps) {
  return (
    <section className={styles.column}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.count}>{tasks.length}</span>
      </header>

      <Droppable droppableId={String(status)}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={
              snapshot.isDraggingOver
                ? `${styles.body} ${styles.bodyOver}`
                : styles.body
            }
          >
            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <p className={styles.empty}>No tasks</p>
            )}

            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                members={members}
                onSelect={onSelectTask}
              />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
}
