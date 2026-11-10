import { FolderPlus, UserPlus, ChartNoAxesCombined } from "lucide-react";

import "./HowItWorksSection.css";

const steps = [
  {
    number: "01",
    icon: FolderPlus,
    title: "Create a project",
    description:
      "Start by creating a project and organizing everything your team needs to accomplish.",
  },
  {
    number: "02",
    icon: UserPlus,
    title: "Invite your team",
    description:
      "Bring your teammates together and give everyone a clear place to collaborate.",
  },
  {
    number: "03",
    icon: ChartNoAxesCombined,
    title: "Track progress",
    description:
      "Keep an eye on tasks, deadlines, and project progress as your team moves forward.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="about" className="how-it-works-section">
      <div className="how-it-works-heading">
        <span className="how-it-works-label">GETTING STARTED</span>

        <h2>Getting things done is simple</h2>

        <p>
          Everything you need to organize your work and keep your team moving
          forward.
        </p>
      </div>

      <div className="steps-grid">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <article className="step-card" key={step.number}>
              <div className="step-number">{step.number}</div>

              <div className="step-icon">
                <Icon size={27} strokeWidth={1.8} />
              </div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
