import { Bot, FileSearch, Users } from "lucide-react";
import { site } from "../content/siteContent";

export function HeroSummary() {
  return (
    <section aria-labelledby="hero-heading">
      <h1 id="hero-heading">{site.name}</h1>
      <p>{site.canonicalSummary}</p>
      <aside aria-label="Machine-readable site signals">
        <h2>Machine-Readable Signals</h2>
        <ul>
          <li>
            <Users aria-hidden="true" size={18} /> Audience: {site.audience.join(", ")}
          </li>
          <li>
            <Bot aria-hidden="true" size={18} /> Owner: {site.ownerName}
          </li>
          <li>
            <FileSearch aria-hidden="true" size={18} /> Update cadence: {site.updateCadence}
          </li>
        </ul>
      </aside>
    </section>
  );
}
