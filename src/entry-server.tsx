import { renderToStaticMarkup, renderToString } from "react-dom/server";
import App from "./App";
import { htmlToMarkdown } from "./agent/markdown";
import { buildLlmsFullTxt, buildLlmsTxt, buildSitemap } from "./agent/publicFiles";
import { findRoute, markdownPathFor, notFoundRoute, routes } from "./content/siteContent";
import { renderHead } from "./metadata/head";
import { pageComponents } from "./pages/routeTable";

export type RenderedPage = {
  html: string;
  head: string;
  markdown: string | null;
};

export function renderRoute(pathname: string): RenderedPage {
  const route = findRoute(pathname);
  const html = renderToString(<App pathname={pathname} />);

  if (!route) {
    return { html, head: renderHead(notFoundRoute, true), markdown: null };
  }

  const Page = pageComponents[route.path];
  return {
    html,
    head: renderHead(route),
    markdown: htmlToMarkdown(renderToStaticMarkup(<Page />), route)
  };
}

export function buildPublicFiles(): Record<string, string> {
  const pages = routes.map((route) => ({ route, markdown: renderRoute(route.path).markdown ?? "" }));

  return {
    ...Object.fromEntries(pages.map(({ route, markdown }) => [markdownPathFor(route.path).slice(1), markdown])),
    "llms.txt": buildLlmsTxt(),
    "llms-full.txt": buildLlmsFullTxt(pages.map(({ markdown }) => markdown)),
    "sitemap.xml": buildSitemap()
  };
}

export const routePaths = routes.map((route) => route.path);
export const notFoundPath = notFoundRoute.path;
