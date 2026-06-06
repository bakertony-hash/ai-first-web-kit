import type { ReactNode } from "react";
import { routes, site } from "../content/siteContent";

type ShellProps = {
  children: ReactNode;
};

export function Shell({ children }: ShellProps) {
  return (
    <div>
      <header>
        <a href="/">{site.name}</a>
        <nav aria-label="Primary navigation">
          {routes.map((route) => (
            <a href={route.path} key={route.path}>
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
