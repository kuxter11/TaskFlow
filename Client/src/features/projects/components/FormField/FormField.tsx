import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import styles from "./FormField.module.css";

// Which element to render, and the normal props of that element.
type InputField = { as?: "input" } & InputHTMLAttributes<HTMLInputElement>;
type TextareaField = { as: "textarea" } & TextareaHTMLAttributes<HTMLTextAreaElement>;
type SelectField = { as: "select" } & SelectHTMLAttributes<HTMLSelectElement>;

type FormFieldProps = { id: string; label: string } & (
  | InputField
  | TextareaField
  | SelectField
);

/**
 * Label + input/textarea/select with the look of the project and task modals.
 * Renders a fragment, so the parent form decides the spacing between fields.
 */
export default function FormField(props: FormFieldProps) {
  return (
    <>
      <label htmlFor={props.id} className={styles.label}>
        {props.label}
      </label>
      <Control {...props} />
    </>
  );
}

function Control(props: FormFieldProps) {
  if (props.as === "textarea") {
    const { as, label, ...textareaProps } = props;
    return (
      <textarea
        className={`${styles.control} ${styles.textarea}`}
        {...textareaProps}
      />
    );
  }

  if (props.as === "select") {
    const { as, label, ...selectProps } = props;
    return <select className={styles.select} {...selectProps} />;
  }

  const { as, label, ...inputProps } = props;
  return <input className={styles.control} {...inputProps} />;
}
