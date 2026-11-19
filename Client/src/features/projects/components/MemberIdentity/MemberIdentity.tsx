import styles from "./MemberIdentity.module.css";

interface MemberIdentityProps {
  username: string;
  email: string;
}

// Name above email. Used in the members list and in the add-member search results.
export default function MemberIdentity({ username, email }: MemberIdentityProps) {
  return (
    <span className={styles.identity}>
      <span className={styles.name}>{username}</span>
      <span className={styles.email}>{email}</span>
    </span>
  );
}
