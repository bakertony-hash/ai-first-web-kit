import { agentTasks } from "../content/siteContent";

export function AgentTaskList() {
  return (
    <section aria-labelledby="agent-tasks-heading">
      <h2 id="agent-tasks-heading">Agent Tasks</h2>
      <ul>
        {agentTasks.map((task) => (
          <li key={task}>{task}</li>
        ))}
      </ul>
    </section>
  );
}
