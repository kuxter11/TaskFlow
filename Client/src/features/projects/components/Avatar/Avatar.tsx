import type { ReactNode } from "react";
import styles from "./Avatar.module.css";

type AvatarVariant = "default" | "muted" | "empty";

interface AvatarProps {
  /** Shown as the tooltip; its first two letters are the initials. */
  name: string;
  size?: number;
  variant?: AvatarVariant;
  /** Overlaps the previous avatar (used inside AvatarStack). */
  stacked?: boolean;
  /** Replaces the initials, e.g. "?", "+3" or an icon. Keeps the CSS default size. */
  children?: ReactNode;
}

const variantClass: Record<AvatarVariant, string | undefined> = {
  default: undefined,
  muted: styles.muted,
  empty: styles.empty,
};

export default function Avatar({
  name,
  size = 26,
  variant = "default",
  stacked = false,
  children,
}: AvatarProps) {
  const className = [styles.avatar, variantClass[variant], stacked && styles.stacked]
    .filter(Boolean)
    .join(" ");

  if (children !== undefined) {
    return (
      <span className={className} title={name}>
        {children}
      </span>
    );
  }

  return (
    <span
      className={className}
      title={name}
      // Dynamic size → inline style is allowed here.
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      {name.slice(0, 2).toUpperCase()}
    </span>
  );
}
