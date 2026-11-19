import type { InputHTMLAttributes } from "react";
import styles from "./AuthField.module.css";

// Every normal <input> prop (type, value, onChange, required...) is passed through.
interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export default function AuthField({ id, label, ...inputProps }: AuthFieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      <input id={id} className={styles.input} {...inputProps} />
    </div>
  );
}
