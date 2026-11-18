import { Draggable, Droppable } from "@hello-pangea/dnd";
import { ProjectTaskStatus, type ProjectTask } from "../../../types/task.types";
import type { ProjectMember } from "../../../types/project.types";
import { UserPlus } from "lucide-react";
import "./BoardColumn.css";

interface BoardColumnProps {
  title: string;
  status: ProjectTaskStatus;
  tasks: ProjectTask[];
  members: ProjectMember[];
  onSelectTask: (task: ProjectTask) => void;
}

function getInitials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export default function BoardColumn({
  title,
  status,
  tasks,
  members,
  onSelectTask,
}: BoardColumnProps) {
  return (
    <section className="board-column">
      <header className="board-column-header">
        <h2>{title}</h2>
        <span className="board-column-count">{tasks.length}</span>
      </header>

      <Droppable droppableId={String(status)}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`board-column-body ${
              snapshot.isDraggingOver ? "board-column-body--over" : ""
            }`}
          >
            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <p className="board-column-empty">No tasks</p>
            )}

            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={String(task.id)}
                index={index}
              >
                {(dragProvided, dragSnapshot) => (
                  <article
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                    className={`task-card ${
                      dragSnapshot.isDragging ? "task-card--dragging" : ""
                    }`}
                    onClick={() => onSelectTask(task)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") onSelectTask(task);
                    }}
                  >
                    <h3>{task.title}</h3>
                    {task.description && <p>{task.description}</p>}
                    {(() => {
                      const assignee = members.find(
                        (m) => m.userId === task.assigneeId,
                      );
                      return (
                        <div className="task-card-footer">
                          <span className="task-card-meta">
                            #{task.id} · {formatDate(task.createdAt)}
                          </span>

                          {assignee ? (
                            <span className="avatar" title={assignee.username}>
                              {getInitials(assignee.username)}
                            </span>
                          ) : task.assigneeId ? (
                            <span className="avatar" title="Former member">
                              ?
                            </span>
                          ) : (
                            <span
                              className="avatar avatar--empty"
                              title="Unassigned"
                            >
                              <UserPlus size={14} />
                            </span>
                          )}
                        </div>
                      );
                    })()}
                  </article>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
}
