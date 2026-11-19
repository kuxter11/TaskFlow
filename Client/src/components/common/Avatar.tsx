import "./Avatar.css";

interface AvatarProps {
  name: string;
  size?: number;
}

export default function Avatar({ name, size = 26 }: AvatarProps) {
  return (
    <span
      className="avatar"
      title={name}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      {name.slice(0, 2).toUpperCase()}
    </span>
  );
}
