import { agentAssets } from "../content/siteContent";

export function EvidencePanel() {
  return (
    <section aria-labelledby="agent-evidence-heading">
      <h2 id="agent-evidence-heading">Agent Evidence</h2>
      <ul>
        {agentAssets.map((asset) => (
          <li key={asset.path}>
            <a href={asset.path}>{asset.label}</a>
            <p>{asset.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
