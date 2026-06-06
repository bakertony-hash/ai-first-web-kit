import { BookOpen, Bot, Braces, FileText, GitBranch, Sparkles, Users } from "lucide-react";
import { site } from "../content/siteContent";

export function HeroSummary() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <p className="eyebrow">
          <Sparkles aria-hidden="true" size={13} />
          Machine-readable by design
        </p>
        <h1 id="hero-heading">{site.name}</h1>
        <p className="hero-lede">{site.canonicalSummary}</p>
        <div className="hero-actions" aria-label="Primary actions">
          <a className="button button-primary" href="/agent-guide">
            <BookOpen aria-hidden="true" size={18} />
            Read the Guide
          </a>
          <a className="button button-secondary" href="/patterns">
            <GitBranch aria-hidden="true" size={18} />
            View Patterns
          </a>
        </div>
        <ul className="audience-list" aria-label="Made for">
          <li>Made for:</li>
          {site.audience.map((audience) => (
            <li key={audience}>{audience}</li>
          ))}
          <li>Maintainers</li>
        </ul>
      </div>
      <aside className="signal-map" aria-label="Machine-readable site signals">
        <div className="signal-node signal-node-top">
          <Braces aria-hidden="true" size={18} />
          <span>Machine-Readable Signals</span>
        </div>
        <div className="signal-node signal-node-left">
          <Bot aria-hidden="true" size={21} />
          <span>Agent Tasks</span>
        </div>
        <div className="signal-node signal-node-center">
          <Sparkles aria-hidden="true" size={34} />
          <strong>{site.name}</strong>
        </div>
        <div className="signal-node signal-node-right">
          <FileText aria-hidden="true" size={21} />
          <span>Evidence Files</span>
        </div>
        <div className="signal-node signal-node-bottom">
          <Users aria-hidden="true" size={18} />
          <span>Patterns &amp; Guides</span>
        </div>
        <ul className="signal-details">
          <li>Audience: {site.audience.join(", ")}</li>
          <li>Owner: {site.ownerName}</li>
          <li>Update cadence: {site.updateCadence}</li>
        </ul>
      </aside>
    </section>
  );
}
