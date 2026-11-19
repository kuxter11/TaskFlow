import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import {
  addProjectMember,
  searchMemberCandidates,
} from "../../../api/projects.api";
import type { ProjectMember } from "../../../types/project.types";
import Avatar from "../../common/Avatar";
import { useDebouncedValue } from "../../../hooks/useDebounceValue";

interface AddMemberFieldProps {
  projectId: number;
  onAdded: (member: ProjectMember) => void;
}

interface SearchResult {
  query: string;
  users: ProjectMember[];
}

export default function AddMemberField({
  projectId,
  onAdded,
}: AddMemberFieldProps) {
  const [text, setText] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handleAdd = async (user: ProjectMember) => {
    setError(null);
    setAddingId(user.userId);

    try {
      const member = await addProjectMember(projectId, user.userId, {
        skipErrorToast: true,
      });

      onAdded(member);
      setText("");
      setResult(null);
    } catch (err) {
      setError(
        isAxiosError(err) && err.response?.status === 409
          ? "That user is already a member."
          : "Couldn't add this member. Try again.",
      );
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div className="add-member">
      <label htmlFor="add-member-input">Add a member</label>
      <input
        id="add-member-input"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Search by name or email"
        autoComplete="off"
      />

      {error && <p className="add-member-error">{error}</p>}

      {canSearch && (
        <ul className="add-member-results">
          {isSearching && <li className="add-member-hint">Searching...</li>}

          {!isSearching && users.length === 0 && (
            <li className="add-member-hint">No users found</li>
          )}

          {users.map((user) => (
            <li key={user.userId}>
              <button
                type="button"
                className="add-member-option"
                disabled={addingId !== null}
                onClick={() => handleAdd(user)}
              >
                <Avatar name={user.username} size={28} />
                <span className="add-member-text">
                  <span className="member-name">{user.username}</span>
                  <span className="member-email">{user.email}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
