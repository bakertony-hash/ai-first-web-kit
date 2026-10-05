import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { routes, site } from "../content/siteContent";

type ShellProps = {
  children: ReactNode;
  pathname?: string;
};

export function Shell({ children, pathname }: ShellProps) {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header>
        <a className="brand-link" href="/">
          <span className="brand-mark" aria-hidden="true">
            <Sparkles size={17} />
          </span>
          <span>{site.name}</span>
        </a>
        <nav aria-label="Primary navigation">
          {routes.map((route) => (
            <a aria-current={pathname === route.path ? "page" : undefined} href={route.path} key={route.path}>
              {route.label}
            </a>
          ))}
        </nav>
      </header>
      <main id="main">{children}</main>
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
