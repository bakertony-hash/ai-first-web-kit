import {
  Braces,
  Database,
  FileText,
  Link,
  ListChecks,
  Mail
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { patterns } from "../content/siteContent";

const patternIcons: LucideIcon[] = [FileText, Link, Braces, Database, ListChecks, Mail];

export function PatternCardGrid() {
  return (
    <section className="section patterns-section" aria-labelledby="patterns-heading">
      <div className="section-heading">
        <h2 id="patterns-heading">AI-First Website Patterns</h2>
        <p>Proven patterns for building AI-friendly websites.</p>
      </div>
      <div className="pattern-grid">
        {patterns.map((pattern, index) => {
          const Icon = patternIcons[index] ?? FileText;

          return (
            <article className="pattern-card" key={pattern.title}>
              <span className="icon-tile" aria-hidden="true">
                <Icon size={22} />
              </span>
              <h3>{pattern.title}</h3>
              <p>{pattern.summary}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
