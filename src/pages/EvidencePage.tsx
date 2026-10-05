export function EvidencePage() {
  return (
    <div className="subpage">
      <section className="subpage-intro" aria-labelledby="evidence-heading">
        <h1 id="evidence-heading">Evidence</h1>
        <p>Lighthouse Agentic Browsing results and verifier checks for every page of this site.</p>
      </section>
      <section className="section prose" aria-labelledby="no-audit-heading">
        <h2 id="no-audit-heading">No audit recorded yet</h2>
        <p>Results will appear here after the first audit of this version of the site.</p>
      </section>
    </div>
  );
}
