import { BriefcaseBusiness } from "lucide-react";
import { agentTasks } from "../content/siteContent";

export function AgentTaskList() {
  return (
    <section className="workbench-panel" aria-labelledby="agent-tasks-heading">
      <div className="panel-heading">
        <span className="icon-tile" aria-hidden="true">
          <BriefcaseBusiness size={24} />
        </span>
        <h2 id="agent-tasks-heading">Agent Tasks</h2>
      </div>
      <ul className="task-list">
        {agentTasks.map((task) => (
          <li key={task}>
            <span>{task}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
