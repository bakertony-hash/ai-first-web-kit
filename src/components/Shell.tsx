import type { MouseEvent, ReactNode } from "react";
import { routes, site } from "../content/siteContent";

type ShellProps = {
  children: ReactNode;
  onNavigate: (path: string) => void;
};

function shouldHandleRouteClick(event: MouseEvent<HTMLAnchorElement>) {
  return (
    event.button === 0 &&
    !event.defaultPrevented &&
    !event.metaKey &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.shiftKey
  );
}

export function Shell({ children, onNavigate }: ShellProps) {
  function handleRouteClick(event: MouseEvent<HTMLAnchorElement>, path: string) {
    if (!shouldHandleRouteClick(event)) {
      return;
    }

    event.preventDefault();
    onNavigate(path);
  }

  return (
    <div>
      <header>
        <a href="/" onClick={(event) => handleRouteClick(event, "/")}>
          {site.name}
        </a>
        <nav aria-label="Primary navigation">
          {routes.map((route) => (
            <a
              href={route.path}
              key={route.path}
              onClick={(event) => handleRouteClick(event, route.path)}
            >
              {route.label}
            </a>
          ))}
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>{site.canonicalSummary}</p>
        <a href="/llms.txt">llms.txt</a>
      </footer>
    </div>
  );
}
