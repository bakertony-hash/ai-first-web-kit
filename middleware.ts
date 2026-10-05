import { next, rewrite } from "@vercel/functions";
import { prefersMarkdown } from "./src/agent/negotiation";
import { findRoute, markdownPathFor, routes } from "./src/content/siteContent";
import { canonicalUrl } from "./src/metadata/head";

// Vercel reads this statically, so the paths are spelled out; a test keeps them in sync with `routes`.
export const config = {
  matcher: [
    "/",
    "/patterns",
    "/interfaces",
    "/evidence",
    "/contact",
    "/index.md",
    "/patterns.md",
    "/interfaces.md",
    "/evidence.md",
    "/contact.md"
  ]
};

const markdownHeaders = (path: string) => ({
  "Content-Type": "text/markdown; charset=utf-8",
  Link: `<${canonicalUrl(path)}>; rel="canonical"`
});

function routeForMarkdownPath(pathname: string) {
  return routes.find((route) => markdownPathFor(route.path) === pathname);
}

export default function middleware(request: Request): Response {
  const { pathname } = new URL(request.url);

  const markdownRoute = routeForMarkdownPath(pathname);
  if (markdownRoute) {
    return next({ headers: markdownHeaders(markdownRoute.path) });
  }

  const route = findRoute(pathname);
  if (route && prefersMarkdown(request.headers.get("accept"))) {
    return rewrite(new URL(markdownPathFor(route.path), request.url), {
      headers: { ...markdownHeaders(route.path), Vary: "Accept" }
    });
  }

  return next({ headers: { Vary: "Accept" } });
}
