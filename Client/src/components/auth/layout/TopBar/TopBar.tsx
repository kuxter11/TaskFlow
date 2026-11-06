import "./TopBar.css";

interface TopBarProps {
  onLogin: () => void;
  onRegister: () => void;
}

export default function TopBar({ onLogin, onRegister }: TopBarProps) {
  return (
    <header className="topbar">
      <div className="topbar-auth">
        <button className="login-btn" onClick={onLogin}>
          Login
        </button>

        <button className="register-btn" onClick={onRegister}>
          Register
        </button>
      </div>
    </header>
  );
}
