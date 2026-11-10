import "./Button.css";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
}

function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
  isLoading = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`app-button app-button--${variant}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? "Please wait..." : children}
    </button>
  );
}

export default Button;
