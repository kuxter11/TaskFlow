import LandingNavbar from "./LandingNavbar";
import type { AuthMode } from "../../types/auth.types";
import "./LandingPage.css";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeatureSection";
import HowItWorksSection from "./HowItWorksSection";
import CallToAction from "./CallToAction";
import LandingFooter from "./LandingFooter";

interface LandingPageProps {
  onOpenAuth: (mode: AuthMode) => void;
}

export default function LandingPage({ onOpenAuth }: LandingPageProps) {
  return (
    <div className="landing-page">
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
