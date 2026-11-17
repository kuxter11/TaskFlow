import { ProjectTaskStatus, type ProjectTask } from "../../../types/task.types";

interface BoardColumnProps {
  title: string;
  status: ProjectTaskStatus;
  tasks: ProjectTask[];
  onSelectTask: (task: ProjectTask) => void;
}

export default function BoardColumn({
  title,
  tasks,
  onSelectTask,
}: BoardColumnProps) {
  return (
    <section className="board-column">
      <header className="board-column-header">
        <h2>{title}</h2>
        <span className="board-column-count">{tasks.length}</span>
      </header>

      <div className="board-column-body">
        {tasks.length === 0 ? (
          <p className="board-column-empty">No tasks</p>
        ) : (
          tasks.map((task) => (
            <article
              key={task.id}
              className="task-card"
              role="button"
              tabIndex={0}
              onClick={() => onSelectTask(task)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelectTask(task);
                }
              }}
            >
              <h3>{task.title}</h3>
              {task.description && <p>{task.description}</p>}
            </article>
          ))
        )}
      </div>
    </section>
  );
}
