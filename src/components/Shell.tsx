import { Moon, Sparkles } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";
import { routes, site } from "../content/siteContent";

type ShellProps = {
  children: ReactNode;
  onNavigate: (path: string) => void;
  pathname: string;
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

export function Shell({ children, onNavigate, pathname }: ShellProps) {
  function handleRouteClick(event: MouseEvent<HTMLAnchorElement>, path: string) {
    if (!shouldHandleRouteClick(event)) {
      return;
    }

    event.preventDefault();
    onNavigate(path);
  }

  return (
    <div className="app-shell">
      <header>
        <a className="brand-link" href="/" onClick={(event) => handleRouteClick(event, "/")}>
          <span className="brand-mark" aria-hidden="true">
            <Sparkles size={17} />
          </span>
          <span>{site.name}</span>
        </a>
        <nav aria-label="Primary navigation">
          {routes.map((route) => (
            <a
              aria-current={pathname === route.path ? "page" : undefined}
              href={route.path}
              key={route.path}
              onClick={(event) => handleRouteClick(event, route.path)}
            >
              {route.label}
            </a>
          ))}
        </nav>
        <span className="theme-indicator" aria-label="Dark visual theme">
          <Moon size={15} />
        </span>
      </header>
      <main>{children}</main>
      <footer>
        <div className="footer-summary">
          <Sparkles aria-hidden="true" size={24} />
          <p>{site.canonicalSummary}</p>
        </div>
        <a className="footer-link" href="/llms.txt">
          llms.txt
          <span aria-hidden="true">-&gt;</span>
        </a>
      </footer>
    </div>
  );
}
