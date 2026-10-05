import { renderToString } from "react-dom/server";
import App from "./App";
import { findRoute, notFoundRoute, routes } from "./content/siteContent";
import { renderHead } from "./metadata/head";

export type RenderedPage = {
  html: string;
  head: string;
};

export function renderRoute(pathname: string): RenderedPage {
  const route = findRoute(pathname);

  return {
    html: renderToString(<App pathname={pathname} />),
    head: route ? renderHead(route) : renderHead(notFoundRoute, true)
  };
}

export const routePaths = routes.map((route) => route.path);
export const notFoundPath = notFoundRoute.path;
