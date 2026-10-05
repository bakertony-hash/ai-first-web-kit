import { layers, patterns, site } from "../content/siteContent";
import type { Pattern } from "../content/siteContent";
import { layerIcons } from "./layerIcons";
import { SourceLinks } from "./SourceLinks";

export function PatternCard({ pattern }: { pattern: Pattern }) {
  return (
    <article className="pattern-card" id={pattern.id}>
      <h3>{pattern.title}</h3>
      <p>{pattern.summary}</p>
      <p>
        <strong>On this site:</strong> {pattern.howThisSiteDoesIt}{" "}
        <a href={`${site.repoUrl}/blob/main/${pattern.sourcePath}`}>
          <code>{pattern.sourcePath}</code>
        </a>
      </p>
      <SourceLinks sources={pattern.sources} />
    </article>
  );
}

export function PatternList() {
  return (
    <>
      {layers.map((layer) => {
        const Icon = layerIcons[layer.id];

        return (
          <section className="section" aria-labelledby={`layer-${layer.id}`} id={layer.id} key={layer.id}>
            <div className="section-heading">
              <h2 id={`layer-${layer.id}`}>
                <span className="icon-tile" aria-hidden="true">
                  <Icon size={22} />
                </span>
                {layer.name}
              </h2>
              <p>{layer.summary}</p>
            </div>
            <div className="pattern-grid">
              {patterns
                .filter((pattern) => pattern.layer === layer.id)
                .map((pattern) => (
                  <PatternCard key={pattern.id} pattern={pattern} />
                ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
