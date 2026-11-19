import { useState } from "react";
import { Plus } from "lucide-react";
import type { Project, ProjectMember } from "@/types/project.types";
import {
  ProjectTaskStatus,
  taskStatuses,
  type ProjectTask,
} from "@/types/task.types";
import Button from "@/components/ui/Button/Button";
import BoardColumn from "./BoardColumn";
import CreateTaskModal from "./CreateTaskModal";
import "./ProjectBoard.css";
import TaskModal from "./TaskModal";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { updateTaskStatus } from "@/api/tasks.api";

interface BoardViewProps {
  project: Project;
  initialTasks: ProjectTask[];
  members: ProjectMember[];
}

export default function BoardView({
  project,
  initialTasks,
  members,
}: BoardViewProps) {
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

  const setTaskStatus = (taskId: number, status: ProjectTaskStatus) => {
    setTasks((previous) =>
      previous.map((t) => (t.id === taskId ? { ...t, status } : t)),
    );
  };

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;

    const taskId = Number(draggableId);
    const oldStatus = Number(source.droppableId) as ProjectTaskStatus;
    const newStatus = Number(destination.droppableId) as ProjectTaskStatus;

    setTaskStatus(taskId, newStatus);

    try {
      const updated = await updateTaskStatus(project.id, taskId, newStatus);

      setTasks((previous) =>
        previous.map((t) => (t.id === updated.id ? updated : t)),
      );
    } catch {
      setTaskStatus(taskId, oldStatus);
    }
  };

  return (
    <div className="board-page">
      <div className="board-toolbar">
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Add Task
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="board-columns">
          {taskStatuses.map((column) => (
            <BoardColumn
              key={column.status}
              title={column.title}
              status={column.status}
              tasks={tasks.filter((t) => t.status === column.status)}
              members={members}
              onSelectTask={setSelectedTask}
            />
          ))}
        </div>
      </DragDropContext>

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
          members={members}
          onClose={() => setSelectedTask(null)}
          onUpdated={handleTaskUpdated}
        />
      )}
    </div>
  );
}
