import { Download, FileText } from "lucide-react";
import { agentAssets } from "../content/siteContent";

export function EvidencePanel() {
  return (
    <section className="workbench-panel" aria-labelledby="agent-evidence-heading">
      <div className="panel-heading">
        <span className="icon-tile" aria-hidden="true">
          <FileText size={24} />
        </span>
        <h2 id="agent-evidence-heading">Agent Evidence</h2>
      </div>
      <ul className="evidence-list">
        {agentAssets.map((asset) => (
          <li key={asset.path}>
            <a href={asset.path}>
              <span>
                <strong>{asset.label}</strong>
                <small>{asset.description}</small>
              </span>
              <Download aria-hidden="true" size={16} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
