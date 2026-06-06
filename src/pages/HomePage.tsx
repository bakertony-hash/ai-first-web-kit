import { Bot, ShieldCheck, Users, Zap } from "lucide-react";
import { AgentTaskList } from "../components/AgentTaskList";
import { EvidencePanel } from "../components/EvidencePanel";
import { FAQSection } from "../components/FAQSection";
import { HeroSummary } from "../components/HeroSummary";
import { PatternCardGrid } from "../components/PatternCardGrid";

const features = [
  {
    icon: Users,
    title: "For Humans",
    body: "Clear, scannable, and easy to understand."
  },
  {
    icon: Bot,
    title: "For AI Agents",
    body: "Structured, consistent, and machine-readable."
  },
  {
    icon: ShieldCheck,
    title: "For Maintainers",
    body: "Well-documented and easy to update."
  },
  {
    icon: Zap,
    title: "For Performance",
    body: "Fast, lightweight, and SEO-friendly."
  }
] as const;

export function HomePage() {
  return (
    <>
      <HeroSummary />
      <section className="feature-strip" aria-label="Site strengths">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <article key={feature.title}>
              <span className="icon-tile" aria-hidden="true">
                <Icon size={23} />
              </span>
              <div>
                <h2>{feature.title}</h2>
                <p>{feature.body}</p>
              </div>
            </article>
          );
        })}
      </section>
      <section className="section start-section" aria-labelledby="start-heading">
        <div className="section-heading">
          <h2 id="start-heading">Start Here</h2>
          <p>Everything an AI agent (or human) needs to understand this site.</p>
        </div>
        <div className="workbench">
          <AgentTaskList />
          <EvidencePanel />
        </div>
      </section>
      <PatternCardGrid />
      <FAQSection />
    </>
  );
}
