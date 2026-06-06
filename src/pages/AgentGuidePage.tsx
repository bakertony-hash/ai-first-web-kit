import { agentAssets, agentTasks, site } from "../content/siteContent";

export function AgentGuidePage() {
  return (
    <>
      <h1>Agent Guide</h1>
      <p>{site.canonicalSummary}</p>
      <section aria-labelledby="recommended-tasks-heading">
        <h2 id="recommended-tasks-heading">Recommended Tasks</h2>
        <ul>
          {agentTasks.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="machine-readable-assets-heading">
        <h2 id="machine-readable-assets-heading">Machine-Readable Assets</h2>
        <ul>
          {agentAssets.map((asset) => (
            <li key={asset.path}>
              <a href={asset.path}>{asset.label}</a>
              <p>{asset.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
