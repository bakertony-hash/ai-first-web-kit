import { describe, expect, it } from "vitest";
import { buildPublicFiles, notFoundPath, renderRoute, routePaths } from "./entry-server";
import { markdownPathFor, routes, site } from "./content/siteContent";

function parse(html: string) {
  return new DOMParser().parseFromString(`<!doctype html><html><head></head><body>${html}</body></html>`, "text/html");
}

describe("prerendered routes", () => {
  it.each(routes.map((route) => [route.path, route] as const))("renders %s with its own heading and head tags", (path, route) => {
    const { html, head } = renderRoute(path);
    const doc = parse(html);
    const canonical = path === "/" ? `${site.url}/` : `${site.url}${path}`;

    expect(doc.querySelectorAll("h1")).toHaveLength(1);
    expect(head).toContain(`<title>${route.title}</title>`);
    expect(head).toContain(`<link rel="canonical" href="${canonical}" />`);
    expect(doc.querySelector('script[type="application/ld+json"]')).not.toBeNull();
  });

  it("gives every route a unique title and h1", () => {
    const rendered = routePaths.map((path) => renderRoute(path));
    const titles = rendered.map(({ head }) => head.match(/<title>(.*?)<\/title>/)?.[1]);
    const headings = rendered.map(({ html }) => parse(html).querySelector("h1")?.textContent);

    expect(new Set(titles).size).toBe(routePaths.length);
    expect(new Set(headings).size).toBe(routePaths.length);
  });

  it("renders the not-found page as noindex without a canonical", () => {
    const { html, head } = renderRoute(notFoundPath);

    expect(parse(html).querySelector("h1")?.textContent).toBe("Page Not Found");
    expect(head).toContain('<meta name="robots" content="noindex" />');
    expect(head).not.toContain("canonical");
  });

  it("treats a trailing slash as the same route", () => {
    expect(renderRoute("/patterns/").head).toEqual(renderRoute("/patterns").head);
  });

  it.each(routes.map((route) => [route.path] as const))("renders %s as Markdown with the same h1", (path) => {
    const { html, head, markdown } = renderRoute(path);
    const h1 = parse(html).querySelector("h1")?.textContent;

    expect(markdown).toMatch(/^---\ntitle: /);
    expect(markdown).toContain(`\n# ${h1}\n`);
    expect(markdown).not.toMatch(/<svg|lucide|<script/);
    expect(head).toContain(`<link rel="alternate" type="text/markdown" href="${markdownPathFor(path)}" />`);
  });

  it("makes site links in Markdown absolute", () => {
    expect(renderRoute("/").markdown).toContain(`](${site.url}/patterns)`);
  });

  it("emits a .md file per route plus llms.txt, llms-full.txt and sitemap.xml", () => {
    const files = buildPublicFiles();

    expect(Object.keys(files).sort()).toEqual(
      [...routes.map((route) => markdownPathFor(route.path).slice(1)), "llms.txt", "llms-full.txt", "sitemap.xml"].sort()
    );
    expect(files["llms-full.txt"]).toContain("# Interfaces");
  });
});
