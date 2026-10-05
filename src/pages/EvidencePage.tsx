import { auditOutcome, evidence, evidenceDate, scoredSummary } from "../content/evidence";
import { site } from "../content/siteContent";

const isProduction = evidence.targetUrl.startsWith(site.url);

export function EvidencePage() {
  return (
    <div className="subpage">
      <section className="subpage-intro" aria-labelledby="evidence-heading">
        <h1 id="evidence-heading">Evidence</h1>
        <p>
          Lighthouse Agentic Browsing results and verifier checks for every page of this site, published as they came
          back, including anything that didn't pass.
        </p>
      </section>

      <section className="section prose" aria-labelledby="run-heading">
        <h2 id="run-heading">This run</h2>
        <ul>
          <li>
            Date: <time dateTime={evidence.generatedAt}>{evidenceDate}</time>
          </li>
          <li>
            Target: <code>{evidence.targetUrl}</code>
            {isProduction
              ? " (the live site)"
              : " (a local production build served with the same routing rules as the live site)"}
          </li>
          <li>
            Lighthouse {evidence.lighthouseVersion} in {evidence.chromeVersion}, with WebMCP turned on through{" "}
            <code>--enable-features=WebMCPTesting</code>
          </li>
          <li>
            Verifier: {evidence.verifier.passed} of {evidence.verifier.total} checks passed
          </li>
        </ul>
        <p>
          Lighthouse reports this category as a count of passed checks rather than a 0 to 100 score. Audits marked "not
          applicable" had nothing to check on that page, such as WebMCP form checks on a page without forms, or the ARD
          catalog this site deliberately doesn't publish.
        </p>
        <p>
          To reproduce it: <code>AUDIT_BASE_URL={evidence.targetUrl} npm run audit:agentic</code>
        </p>
      </section>

      <section className="section prose" aria-labelledby="pages-heading">
        <h2 id="pages-heading">Lighthouse Agentic Browsing, by page</h2>
        {evidence.pages.map((page) => {
          const { passed, scored } = scoredSummary(page.audits);

          return (
            <article key={page.path}>
              <h3>
                <a href={page.path}>{page.path}</a>: {passed} of {scored} scored audits passed
              </h3>
              <ul>
                {page.audits.map((audit) => (
                  <li key={audit.id}>
                    {audit.title.replace(/`/g, "")}: <strong>{auditOutcome(audit)}</strong>
                    {audit.displayValue && ` (${audit.displayValue})`}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </section>

      <section className="section prose" aria-labelledby="tools-heading">
        <h2 id="tools-heading">WebMCP tools Lighthouse found</h2>
        <ul>
          {evidence.webmcpTools
            .filter((tool, index, all) => all.findIndex((other) => other.name === tool.name) === index)
            .map((tool) => (
              <li key={tool.name}>
                <code>{tool.name}</code> on <a href={tool.page}>{tool.page}</a> ({tool.kind.toLowerCase()}):{" "}
                {tool.description}
              </li>
            ))}
        </ul>
      </section>

      <section className="section prose" aria-labelledby="verifier-heading">
        <h2 id="verifier-heading">Verifier failures</h2>
        {evidence.verifier.failures.length === 0 ? (
          <p>None. Every check in scripts/verify-agent-readability.mjs passed.</p>
        ) : (
          <ul>
            {evidence.verifier.failures.map((failure) => (
              <li key={`${failure.target}-${failure.check}`}>
                <code>{failure.target}</code>: {failure.check} {failure.detail && `(${failure.detail})`}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
