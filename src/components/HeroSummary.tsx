import { BookOpen, GitBranch, Sparkles } from "lucide-react";
import { layers, site } from "../content/siteContent";
import { layerIcons } from "./layerIcons";

export function HeroSummary() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <p className="eyebrow">
          <Sparkles aria-hidden="true" size={13} />
          AI native, as of October 2026
        </p>
        <h1 id="hero-heading">{site.name}</h1>
        <p className="hero-lede">{site.canonicalSummary}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="/patterns">
            <GitBranch aria-hidden="true" size={18} />
            See the patterns
          </a>
          <a className="button button-secondary" href="/interfaces">
            <BookOpen aria-hidden="true" size={18} />
            Read the interfaces
          </a>
        </div>
      </div>
      <aside className="signal-map" aria-labelledby="signal-map-heading">
        <h2 id="signal-map-heading" className="signal-node signal-node-center">
          <Sparkles aria-hidden="true" size={34} />
          Four layers
        </h2>
        {layers.map((layer, index) => {
          const Icon = layerIcons[layer.id];
          const position = ["top", "left", "right", "bottom"][index];

          return (
            <p className={`signal-node signal-node-${position}`} key={layer.id}>
              <Icon aria-hidden="true" size={19} />
              <span>{layer.name}</span>
            </p>
          );
        })}
      </aside>
    </section>
  );
}
