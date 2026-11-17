import { useState } from "react";
import { Plus } from "lucide-react";
import type { Project } from "../../../types/project.types";
import { ProjectTaskStatus, type ProjectTask } from "../../../types/task.types";
import Button from "../../common/Button";
import BoardColumn from "./BoardColumn";
import CreateTaskModal from "./CreateTaskModal";
import "./ProjectBoard.css";
import TaskModal from "./TaskModal";

interface BoardViewProps {
  project: Project;
  initialTasks: ProjectTask[];
}

const columns = [
  { status: ProjectTaskStatus.ToDo, title: "To Do" },
  { status: ProjectTaskStatus.InProgress, title: "In Progress" },
  { status: ProjectTaskStatus.Done, title: "Done" },
];

export default function BoardView({ project, initialTasks }: BoardViewProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);

  const handleTaskCreated = (task: ProjectTask) => {
    setTasks((previous) => [...previous, task]);
  };

  const handleTaskUpdated = (updated: ProjectTask) => {
    setTasks((previous) =>
      previous.map((t) => (t.id === updated.id ? updated : t)),
    );
  };

  return (
    <div className="board-page">
      <div className="board-header">
        <div>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
        </div>

        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Add Task
        </Button>
      </div>

      <div className="board-columns">
        {columns.map((column) => (
          <BoardColumn
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={tasks.filter((t) => t.status === column.status)}
            onSelectTask={setSelectedTask}
          />
        ))}
      </div>

      <CreateTaskModal
        isOpen={isModalOpen}
        projectId={project.id}
        onClose={() => setIsModalOpen(false)}
        onCreated={handleTaskCreated}
      />

      {selectedTask && (
        <TaskModal
          key={selectedTask.id}
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdated={handleTaskUpdated}
        />
      )}
    </div>
  );
}
