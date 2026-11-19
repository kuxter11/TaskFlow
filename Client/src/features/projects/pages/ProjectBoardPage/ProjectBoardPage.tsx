import { useOutletContext } from "react-router";
import type { ProjectOutletContext } from "@/features/projects/types";
import BoardView from "@/features/projects/components/BoardView/BoardView";
import { useBoardData } from "./useBoardData";

export default function ProjectBoardPage() {
  const { project } = useOutletContext<ProjectOutletContext>();
  const result = useBoardData(project.id);

  if (result === null) {
    return <p>Loading board...</p>;
  }

  if (result.failed) {
    return <p>Failed to load the board.</p>;
  }

  return (
    <BoardView
      key={project.id}
      project={project}
      initialTasks={result.tasks}
      members={result.members}
    />
  );
}
