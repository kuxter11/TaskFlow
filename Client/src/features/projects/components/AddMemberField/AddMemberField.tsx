import { useState } from "react";
import { isAxiosError } from "axios";
import { addProjectMember } from "@/features/projects/projects.api";
import type { ProjectMember } from "@/features/projects/types";
import CandidateOption from "./CandidateOption/CandidateOption";
import { useMemberSearch } from "./useMemberSearch";
import styles from "./AddMemberField.module.css";

interface AddMemberFieldProps {
  projectId: number;
  onAdded: (member: ProjectMember) => void;
}

export default function AddMemberField({
  projectId,
  onAdded,
}: AddMemberFieldProps) {
  const [text, setText] = useState("");
  const [addingId, setAddingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { canSearch, isSearching, users, clearResults } = useMemberSearch(
    projectId,
    text,
  );

  const handleAdd = async (user: ProjectMember) => {
    setError(null);
    setAddingId(user.userId);

    try {
      const member = await addProjectMember(projectId, user.userId, {
        skipErrorToast: true,
      });

      onAdded(member);
      setText("");
      clearResults();
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
    <div className={styles.field}>
      <label htmlFor="add-member-input" className={styles.label}>
        Add a member
      </label>
      <input
        id="add-member-input"
        className={styles.input}
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Search by name or email"
        autoComplete="off"
      />

      {error && <p className={styles.error}>{error}</p>}

      {canSearch && (
        <ul className={styles.results}>
          {isSearching && <li className={styles.hint}>Searching...</li>}

          {!isSearching && users.length === 0 && (
            <li className={styles.hint}>No users found</li>
          )}

          {users.map((user) => (
            <li key={user.userId}>
              <CandidateOption
                user={user}
                disabled={addingId !== null}
                onSelect={handleAdd}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
