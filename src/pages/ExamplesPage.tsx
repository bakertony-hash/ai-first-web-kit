import { Code2 } from "lucide-react";
import { examples } from "../content/siteContent";

export function ExamplesPage() {
  return (
    <div className="subpage">
      <section className="subpage-intro" aria-labelledby="examples-heading">
        <h1 id="examples-heading">Examples</h1>
        <p>Concrete examples of content structures that help humans and AI agents reach the same facts.</p>
      </section>
      <div className="example-grid">
        {examples.map((example) => (
          <article className="page-panel" key={example.title}>
            <span className="icon-tile" aria-hidden="true">
              <Code2 size={22} />
            </span>
            <h2>{example.title}</h2>
            <p>{example.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
