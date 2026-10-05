import { describe, expect, it } from "vitest";
import { routes, site } from "../content/siteContent";
import { buildLlmsTxt, buildSitemap } from "./publicFiles";

describe("llms.txt", () => {
  const llms = buildLlmsTxt();
  const links = [...llms.matchAll(/^- \[(.+?)\]\((.+?)\): .+$/gm)].map((match) => match[2]);

  it("follows the spec: H1, blockquote summary, then link lists", () => {
    expect(llms.startsWith(`# ${site.name}\n\n> `)).toBe(true);
    expect(llms).toMatch(/^## Pages$/m);
  });

  it("links every route with an absolute URL", () => {
    expect(links).toHaveLength(routes.length);
    expect(links.every((link) => link.startsWith(`${site.url}/`))).toBe(true);
  });
});

describe("sitemap.xml", () => {
  it("lists exactly the page routes", () => {
    const locs = [...buildSitemap().matchAll(/<loc>(.+?)<\/loc>/g)].map((match) => match[1]);

    expect(locs).toEqual(routes.map((route) => (route.path === "/" ? `${site.url}/` : `${site.url}${route.path}`)));
  });
});
