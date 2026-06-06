import { PatternCardGrid } from "../components/PatternCardGrid";

export function PatternsPage() {
  return (
    <div className="subpage">
      <section className="subpage-intro" aria-labelledby="patterns-page-heading">
        <h1 id="patterns-page-heading">Patterns</h1>
        <p>Use these patterns to make a site easier for agents to inspect, summarize, and route through.</p>
      </section>
      <PatternCardGrid />
    </div>
  );
}
