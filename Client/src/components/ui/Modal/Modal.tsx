import { useEffect, useId, useRef, type ReactNode } from "react";
import { useScrollLock } from "./useScrollLock";
import styles from "./Modal.module.css";

type ModalVariant = "default" | "centered";

const variantClass: Record<ModalVariant, string> = {
  default: styles.standard,
  centered: styles.centered,
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  /** Rendered under the content, right-aligned (e.g. Cancel / Save buttons). */
  footer?: ReactNode;
  /** "default": header with inline close button. "centered": centered header, round close button. */
  variant?: ModalVariant;
  /** Blocks Escape and the X button, e.g. while a form is submitting. */
  closeDisabled?: boolean;
}

/**
 * Base modal used by every feature modal.
 * Uses the native <dialog> element: showModal() gives us the backdrop,
 * focus trapping and the Escape key for free.
 * Closes only via Escape or the X button (not on backdrop click).
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  variant = "default",
  closeDisabled = false,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useScrollLock(isOpen);

  // Open the dialog as a modal once it is in the DOM.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;

    if (!dialog.open) dialog.showModal();

    return () => dialog.close();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.dialog} ${variantClass[variant]}`}
      aria-labelledby={titleId}
      onCancel={(event) => {
        // Escape key: React (through isOpen) decides when the dialog closes.
        event.preventDefault();
        if (!closeDisabled) onClose();
      }}
    >
      <header className={styles.header}>
        <div>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          {description && <p className={styles.description}>{description}</p>}
        </div>

        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          disabled={closeDisabled}
          aria-label="Close modal"
        >
          &times;
        </button>
      </header>

      {children}

      {footer && <div className={styles.footer}>{footer}</div>}
    </dialog>
  );
}
