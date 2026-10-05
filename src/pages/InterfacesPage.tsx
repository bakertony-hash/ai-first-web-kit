import { markdownPathFor, routes, site, webmcpTools } from "../content/siteContent";

const tools = Object.values(webmcpTools);

export function InterfacesPage() {
  return (
    <div className="subpage">
      <section className="subpage-intro" aria-labelledby="interfaces-heading">
        <h1 id="interfaces-heading">Interfaces</h1>
        <p>
          The machine-readable interfaces this site offers, documented the way an API would be. Every one of them
          describes content that is also visible on the pages.
        </p>
      </section>
      <section className="section prose" aria-labelledby="markdown-heading" id="markdown">
        <h2 id="markdown-heading">Markdown versions of every page</h2>
        <p>
          Each page has a Markdown version. Request the page URL with <code>Accept: text/markdown</code>, or add{" "}
          <code>.md</code> to the path. The home page is at <code>/index.md</code>. Responses that depend on the Accept
          header include <code>Vary: Accept</code>, and Markdown responses link to the HTML page as canonical.
        </p>
        <pre>
          <code>{`curl -H "Accept: text/markdown" ${site.url}/patterns\ncurl ${site.url}/patterns.md`}</code>
        </pre>
        <ul>
          {routes.map((route) => (
            <li key={route.path}>
              <a href={markdownPathFor(route.path)}>{markdownPathFor(route.path)}</a>
              : {route.label}
            </li>
          ))}
        </ul>
      </section>
      <section className="section prose" aria-labelledby="llms-heading" id="llms-txt">
        <h2 id="llms-heading">llms.txt and llms-full.txt</h2>
        <p>
          <a href="/llms.txt">/llms.txt</a> lists every page with a one-line description, linking to the Markdown
          versions. <a href="/llms-full.txt">/llms-full.txt</a> contains every page's Markdown in one file. Both are
          generated from the same route table as the pages.
        </p>
      </section>
      <section className="section prose" aria-labelledby="discovery-heading" id="discovery">
        <h2 id="discovery-heading">Sitemap and robots policy</h2>
        <p>
          <a href="/sitemap.xml">/sitemap.xml</a> lists the canonical page URLs. <a href="/robots.txt">/robots.txt</a>{" "}
          allows all crawlers and points to the sitemap. Unknown URLs return 404, and the old <code>/agent-guide</code>{" "}
          and <code>/examples</code> URLs redirect permanently.
        </p>
      </section>
      <section className="section prose" aria-labelledby="jsonld-heading" id="structured-data">
        <h2 id="jsonld-heading">Structured data</h2>
        <p>
          Each page includes one JSON-LD graph in its HTML: <code>WebSite</code> and <code>Organization</code> on every
          page, plus the page's own type.
        </p>
        <ul>
          {routes.map((route) => (
            <li key={route.path}>
              <a href={route.path}>{route.label}</a>: <code>{route.pageType}</code>
              {route.path === "/" ? (
                <>
                  {" "}
                  and <code>FAQPage</code>
                </>
              ) : (
                <>
                  {" "}
                  and <code>BreadcrumbList</code>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
      <section className="section prose" aria-labelledby="webmcp-heading" id="webmcp">
        <h2 id="webmcp-heading">WebMCP tools</h2>
        <p>
          Two forms are annotated with the declarative WebMCP API, so browsers that support it expose them to agents as
          tools. In other browsers they are ordinary forms.
        </p>
        {tools.map((tool) => (
          <article className="tool" key={tool.name}>
            <h3>
              <code>{tool.name}</code>
            </h3>
            <p>{tool.description}</p>
            <ul>
              <li>
                Form on <a href={tool.page}>{tool.page}</a>
              </li>
              <li>{tool.autoSubmit ? "Submits automatically, because it is read-only" : "A person submits it"}</li>
              {tool.params.map((param) => (
                <li key={param.name}>
                  Parameter <code>{param.name}</code>: {param.description}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}
