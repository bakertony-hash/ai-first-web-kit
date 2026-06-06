import { BriefcaseBusiness, ChevronRight, Download, FileText } from "lucide-react";
import { agentAssets, agentTasks, site } from "../content/siteContent";

export function AgentGuidePage() {
  return (
    <div className="subpage">
      <section className="subpage-intro" aria-labelledby="agent-guide-heading">
        <h1 id="agent-guide-heading">Agent Guide</h1>
        <p>{site.canonicalSummary}</p>
      </section>
      <div className="subpage-grid">
        <section className="page-panel" aria-labelledby="recommended-tasks-heading">
          <div className="panel-heading">
            <span className="icon-tile" aria-hidden="true">
              <BriefcaseBusiness size={24} />
            </span>
            <h2 id="recommended-tasks-heading">Recommended Tasks</h2>
          </div>
          <ul className="task-list">
            {agentTasks.map((task) => (
              <li key={task}>
                <span>{task}</span>
                <ChevronRight aria-hidden="true" size={18} />
              </li>
            ))}
          </ul>
        </section>
        <section className="page-panel" aria-labelledby="machine-readable-assets-heading">
          <div className="panel-heading">
            <span className="icon-tile" aria-hidden="true">
              <FileText size={24} />
            </span>
            <h2 id="machine-readable-assets-heading">Machine-Readable Assets</h2>
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
      </div>
    </div>
  );
}
