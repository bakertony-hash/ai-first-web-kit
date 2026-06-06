import type { ReactNode } from "react";
import { Shell } from "./components/Shell";
import { allJsonLd } from "./metadata/jsonLd";
import { AgentGuidePage } from "./pages/AgentGuidePage";
import { ContactPage } from "./pages/ContactPage";
import { ExamplesPage } from "./pages/ExamplesPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PatternsPage } from "./pages/PatternsPage";

function normalizePath(pathname: string) {
  if (pathname === "/") {
    return pathname;
  }

  return pathname.replace(/\/+$/, "");
}

function getPage(pathname: string): ReactNode {
  switch (normalizePath(pathname)) {
    case "/":
      return <HomePage />;
    case "/patterns":
      return <PatternsPage />;
    case "/agent-guide":
      return <AgentGuidePage />;
    case "/examples":
      return <ExamplesPage />;
    case "/contact":
      return <ContactPage />;
    default:
      return <NotFoundPage />;
  }
}

export default function App() {
  return (
    <>
      {allJsonLd().map((item) => (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
          key={item["@type"]}
          type="application/ld+json"
        />
      ))}
      <Shell>{getPage(window.location.pathname)}</Shell>
    </>
  );
}
