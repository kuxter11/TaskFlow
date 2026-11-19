import { Plus } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import styles from "./ProjectsHeader.module.css";

interface ProjectsHeaderProps {
  canCreate: boolean;
  onCreate: () => void;
}

export default function ProjectsHeader({ canCreate, onCreate }: ProjectsHeaderProps) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Projects</h1>

      {canCreate && (
        <Button variant="primary" onClick={onCreate}>
          <Plus size={18} />
          Create Project
        </Button>
      )}
    </div>
  );
}
