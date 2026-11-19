import SectionHeading from "@/features/landing/components/SectionHeading/SectionHeading";
import FeatureCard from "./FeatureCard/FeatureCard";
import { features } from "./FeaturesSection.data";
import styles from "./FeaturesSection.module.css";

export default function FeaturesSection() {
  return (
    <section id="features" className={styles.section}>
      <SectionHeading
        label="WHAT TASKFLOW OFFERS"
        title="Everything your team needs to succeed"
        description="Simplify your workflow, stay organized, and focus on what matters most."
      />

      <div className={styles.grid}>
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}
