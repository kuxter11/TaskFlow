import type { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  /** id of a <form> elsewhere in the DOM (lets a submit button live outside its form) */
  form?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  onClick,
  type = "button",
  form,
  disabled = false,
  isLoading = false,
}: ButtonProps) {
  const className = [
    styles.button,
    styles[variant],
    size === "lg" && styles.lg,
    fullWidth && styles.fullWidth,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      form={form}
      className={className}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? "Please wait..." : children}
    </button>
  );
}
