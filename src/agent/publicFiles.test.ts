import { describe, expect, it } from "vitest";
import { markdownPathFor, routes, site } from "../content/siteContent";
import { buildLlmsTxt, buildSitemap } from "./publicFiles";

describe("llms.txt", () => {
  const llms = buildLlmsTxt();
  const pagesSection = llms.split("## Pages")[1].split("## Optional")[0];
  const links = [...pagesSection.matchAll(/^- \[(.+?)\]\((.+?)\): .+$/gm)].map((match) => match[2]);

  it("follows the spec: H1, blockquote summary, then link lists", () => {
    expect(llms.startsWith(`# ${site.name}\n\n> `)).toBe(true);
    expect(llms).toMatch(/^## Pages$/m);
  });

  it("links every route's Markdown version with an absolute URL", () => {
    expect(links).toEqual(routes.map((route) => `${site.url}${markdownPathFor(route.path)}`));
  });

  it("links llms-full.txt in the Optional section", () => {
    expect(llms.split("## Optional")[1]).toContain(`(${site.url}/llms-full.txt)`);
  });
});

describe("sitemap.xml", () => {
  it("lists exactly the page routes", () => {
    const locs = [...buildSitemap().matchAll(/<loc>(.+?)<\/loc>/g)].map((match) => match[1]);

    expect(locs).toEqual(routes.map((route) => (route.path === "/" ? `${site.url}/` : `${site.url}${route.path}`)));
  });
});
