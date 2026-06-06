import { patterns } from "../content/siteContent";

export function PatternCardGrid() {
  return (
    <section aria-labelledby="patterns-heading">
      <h2 id="patterns-heading">AI-First Website Patterns</h2>
      <div>
        {patterns.map((pattern) => (
          <article key={pattern.title}>
            <h3>{pattern.title}</h3>
            <p>{pattern.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
