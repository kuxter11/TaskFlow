import type { AuthMode } from "@/types/auth.types";
import HeroContent from "./HeroContent/HeroContent";
import HeroPreview from "./HeroPreview/HeroPreview";
import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  onOpenAuth: (mode: AuthMode) => void;
}

// Text on the left, fake dashboard preview on the right.
export default function HeroSection({ onOpenAuth }: HeroSectionProps) {
  return (
    <section className={styles.section}>
      <HeroContent onGetStarted={() => onOpenAuth("register")} />
      <HeroPreview />
    </section>
  );
}
