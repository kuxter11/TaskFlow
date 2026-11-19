import { useEffect, useState } from "react";
import { searchMemberCandidates } from "@/features/projects/projects.api";
import type { ProjectMember } from "@/features/projects/types";
import { useDebouncedValue } from "@/features/projects/hooks/useDebouncedValue";

interface SearchResult {
  query: string;
  users: ProjectMember[];
}

/**
 * Searches users that can be added to the project.
 * Waits 300 ms after the last keystroke and needs at least 2 characters.
 */
export function useMemberSearch(projectId: number, text: string) {
  const [result, setResult] = useState<SearchResult | null>(null);

  const query = useDebouncedValue(text.trim(), 300);
  const canSearch = query.length >= 2;

  useEffect(() => {
    if (!canSearch) return;

    let ignore = false;

    searchMemberCandidates(projectId, query, { skipErrorToast: true })
      .then((users) => {
        if (!ignore) setResult({ query, users });
      })
      .catch(() => {
        if (!ignore) setResult({ query, users: [] });
      });

    return () => {
      ignore = true;
    };
  }, [projectId, query, canSearch]);

  const isSearching = canSearch && result?.query !== query;
  const users = canSearch && result?.query === query ? result.users : [];

  const clearResults = () => setResult(null);

  return { canSearch, isSearching, users, clearResults };
}
