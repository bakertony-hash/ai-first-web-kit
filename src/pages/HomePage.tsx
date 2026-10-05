import { FAQSection } from "../components/FAQSection";
import { HeroSummary } from "../components/HeroSummary";
import { layerIcons } from "../components/layerIcons";
import { layers } from "../content/siteContent";

const offerings = [
  {
    href: "/patterns",
    title: "Browse and search the patterns",
    body: "Each pattern says what it is, how this site applies it, and which file to read."
  },
  {
    href: "/interfaces",
    title: "Fetch any page as Markdown",
    body: "Add .md to a page URL, or send Accept: text/markdown to the same URL."
  },
  {
    href: "/evidence",
    title: "Check the evidence",
    body: "Lighthouse Agentic Browsing results and verifier checks for every page."
  },
  {
    href: "/contact",
    title: "Ask the maintainer a question",
    body: "Draft a GitHub issue with a form that browser agents can also fill in."
  }
] as const;

export function HomePage() {
  return (
    <>
      <HeroSummary />
      <section className="feature-strip" aria-labelledby="layers-heading">
        <h2 id="layers-heading" className="visually-hidden">
          What AI native means now
        </h2>
        {layers.map((layer) => {
          const Icon = layerIcons[layer.id];

          return (
            <article key={layer.id}>
              <span className="icon-tile" aria-hidden="true">
                <Icon size={23} />
              </span>
              <div>
                <h3>
                  <a href={`/patterns#${layer.id}`}>{layer.name}</a>
                </h3>
                <p>{layer.summary}</p>
              </div>
            </article>
          );
        })}
      </section>
      <section className="section" aria-labelledby="offerings-heading">
        <div className="section-heading">
          <h2 id="offerings-heading">What you can do here</h2>
          <p>The same options apply whether you are reading this page yourself or using an AI assistant.</p>
        </div>
        <ul className="offering-list">
          {offerings.map((offering) => (
            <li key={offering.href}>
              <a href={offering.href}>{offering.title}</a>
              <p>{offering.body}</p>
            </li>
          ))}
        </ul>
      </section>
      <FAQSection />
    </>
  );
}
