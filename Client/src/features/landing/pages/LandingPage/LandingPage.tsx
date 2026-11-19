import type { AuthMode } from "@/types/auth.types";
import LandingNavbar from "@/features/landing/components/LandingNavbar/LandingNavbar";
import HeroSection from "@/features/landing/components/HeroSection/HeroSection";
import FeaturesSection from "@/features/landing/components/FeaturesSection/FeaturesSection";
import HowItWorksSection from "@/features/landing/components/HowItWorksSection/HowItWorksSection";
import CallToAction from "@/features/landing/components/CallToAction/CallToAction";
import LandingFooter from "@/features/landing/components/LandingFooter/LandingFooter";
import styles from "./LandingPage.module.css";

interface LandingPageProps {
  onOpenAuth: (mode: AuthMode) => void;
}

export default function LandingPage({ onOpenAuth }: LandingPageProps) {
  return (
    <div className={styles.page}>
      <LandingNavbar onOpenAuth={onOpenAuth} />

      <main>
        <HeroSection onOpenAuth={onOpenAuth} />
        <FeaturesSection />
        <HowItWorksSection />
        <CallToAction onOpenAuth={onOpenAuth} />
        <LandingFooter />
      </main>
    </div>
  );
}
