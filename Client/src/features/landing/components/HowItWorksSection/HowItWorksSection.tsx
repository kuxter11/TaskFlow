import SectionHeading from "@/features/landing/components/SectionHeading/SectionHeading";
import StepCard from "./StepCard/StepCard";
import { steps } from "./HowItWorksSection.data";
import styles from "./HowItWorksSection.module.css";

export default function HowItWorksSection() {
  return (
    <section id="about" className={styles.section}>
      <SectionHeading
        label="GETTING STARTED"
        title="Getting things done is simple"
        description="Everything you need to organize your work and keep your team moving forward."
      />

      <div className={styles.grid}>
        {steps.map((step) => (
          <StepCard
            key={step.number}
            number={step.number}
            icon={step.icon}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </section>
  );
}
