import { FolderKanban, Users, ListTodo, CalendarDays } from "lucide-react";

import "./FeatureSection.css";

const features = [
  {
    icon: FolderKanban,
    title: "Project Management",
    description:
      "Create projects, organize work, and keep everything in one place.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Bring your team together and make collaboration easier and clearer.",
  },
  {
    icon: ListTodo,
    title: "Task Organization",
    description:
      "Break projects into manageable tasks and keep track of progress.",
  },
  {
    icon: CalendarDays,
    title: "Planning & Deadlines",
    description:
      "Stay on schedule with a clear overview of upcoming deadlines.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="features-section">
      <div className="features-heading">
        <span className="features-label">WHAT TASKFLOW OFFERS</span>

        <h2>Everything your team needs to succeed</h2>

        <p>
          Simplify your workflow, stay organized, and focus on what matters
          most.
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <article className="feature-card" key={feature.title}>
              <div className="feature-icon">
                <Icon size={25} strokeWidth={1.8} />
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
