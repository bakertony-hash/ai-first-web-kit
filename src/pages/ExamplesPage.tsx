import { examples } from "../content/siteContent";

export function ExamplesPage() {
  return (
    <>
      <h1>Examples</h1>
      <p>Concrete examples of content structures that help humans and AI agents reach the same facts.</p>
      <div>
        {examples.map((example) => (
          <article key={example.title}>
            <h2>{example.title}</h2>
            <p>{example.body}</p>
          </article>
        ))}
      </div>
    </>
  );
}
