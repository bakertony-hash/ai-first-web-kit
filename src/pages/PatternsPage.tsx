import { PatternList } from "../components/PatternList";
import { PatternSearch } from "../components/PatternSearch";
import { SourceLinks } from "../components/SourceLinks";
import { retiredPatterns, watching } from "../content/siteContent";

export function PatternsPage() {
  return (
    <div className="subpage">
      <section className="subpage-intro" aria-labelledby="patterns-page-heading">
        <h1 id="patterns-page-heading">Patterns</h1>
        <p>
          The patterns that make a website AI native in 2026, grouped into four layers. Each one links to the file on
          this site that implements it.
        </p>
      </section>
      <PatternSearch />
      <PatternList />
      <section className="section" aria-labelledby="retired-heading" id="retired">
        <div className="section-heading">
          <h2 id="retired-heading">Retired patterns</h2>
          <p>Patterns this site used to follow in 2025, and why they were dropped.</p>
        </div>
        <ul className="plain-list">
          {retiredPatterns.map((pattern) => (
            <li key={pattern.title}>
              <h3>{pattern.title}</h3>
              <p>{pattern.why}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="section" aria-labelledby="watching-heading" id="watching">
        <div className="section-heading">
          <h2 id="watching-heading">Watching</h2>
          <p>Emerging standards this site tracks but doesn't adopt yet.</p>
        </div>
        <ul className="plain-list">
          {watching.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>
                <strong>Status:</strong> {item.status}
              </p>
              <p>{item.why}</p>
              <SourceLinks sources={item.sources} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
