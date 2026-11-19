import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { getProjectById } from "@/features/projects/projects.api";
import type { Project } from "@/features/projects/types";

interface LoadResult {
  projectId: number;
  project: Project | null;
  error: string | null;
}

/**
 * Loads one project. Returns null while loading.
 * The result remembers which id it belongs to, so when the id changes
 * we show "loading" instead of the previous project's data.
 */
export function useProject(id: number) {
  const [result, setResult] = useState<LoadResult | null>(null);

  useEffect(() => {
    if (Number.isNaN(id)) return;

    let ignore = false;

    getProjectById(id, { skipErrorToast: true })
      .then((project) => {
        if (!ignore) setResult({ projectId: id, project, error: null });
      })
      .catch((err) => {
        if (ignore) return;

        const notFound = isAxiosError(err) && err.response?.status === 404;

        setResult({
          projectId: id,
          project: null,
          error: notFound
            ? "Project not found, or you don't have access to it."
            : "Failed to load project.",
        });
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  return result?.projectId === id ? result : null;
}
