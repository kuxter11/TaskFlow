import styles from "./FormError.module.css";

interface FormErrorProps {
  message: string | null;
}

// Error line under a modal form. Renders nothing when there's no error.
export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return <p className={styles.error}>{message}</p>;
}
