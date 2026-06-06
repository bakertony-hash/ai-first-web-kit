import { AgentTaskList } from "../components/AgentTaskList";
import { EvidencePanel } from "../components/EvidencePanel";
import { FAQSection } from "../components/FAQSection";
import { HeroSummary } from "../components/HeroSummary";
import { PatternCardGrid } from "../components/PatternCardGrid";

export function HomePage() {
  return (
    <>
      <HeroSummary />
      <AgentTaskList />
      <EvidencePanel />
      <PatternCardGrid />
      <FAQSection />
    </>
  );
}
