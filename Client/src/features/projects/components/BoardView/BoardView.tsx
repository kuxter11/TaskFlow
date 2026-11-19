import { useState } from "react";
import { Plus } from "lucide-react";
import { DragDropContext } from "@hello-pangea/dnd";
import Button from "@/components/ui/Button/Button";
import {
  taskStatuses,
  type Project,
  type ProjectMember,
  type ProjectTask,
} from "@/features/projects/types";
import BoardColumn from "@/features/projects/components/BoardColumn/BoardColumn";
import CreateTaskModal from "@/features/projects/components/CreateTaskModal/CreateTaskModal";
import TaskModal from "@/features/projects/components/TaskModal/TaskModal";
import { useBoardTasks } from "./useBoardTasks";
import styles from "./BoardView.module.css";

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
  const { tasks, addTask, replaceTask, handleDragEnd } = useBoardTasks(
    project.id,
    initialTasks,
  );

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);

  return (
    <div>
      <div className={styles.toolbar}>
        <Button variant="primary" onClick={() => setIsCreateOpen(true)}>
          <Plus size={18} />
          Add Task
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={styles.columns}>
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
        isOpen={isCreateOpen}
        projectId={project.id}
        onClose={() => setIsCreateOpen(false)}
        onCreated={addTask}
      />

      {selectedTask && (
        <TaskModal
          key={selectedTask.id}
          task={selectedTask}
          members={members}
          onClose={() => setSelectedTask(null)}
          onUpdated={replaceTask}
        />
      )}
    </div>
  );
}
