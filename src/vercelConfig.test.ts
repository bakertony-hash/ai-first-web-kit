import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("Vercel deployment config", () => {
  it("rewrites app routes to index.html for direct links", () => {
    const config = JSON.parse(readFileSync(join(process.cwd(), "vercel.json"), "utf8"));

    expect(config.rewrites).toContainEqual({
      source: "/((?!api|.*\\..*).*)",
      destination: "/index.html"
    });
  });

  it("sets agent-readable content headers for machine-readable files", () => {
    const config = JSON.parse(readFileSync(join(process.cwd(), "vercel.json"), "utf8"));

    expect(config.headers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: "/llms.txt",
          headers: expect.arrayContaining([
            { key: "Content-Type", value: "text/plain;charset=UTF-8" },
            { key: "X-Robots-Tag", value: "index, follow" }
          ])
        }),
        expect.objectContaining({
          source: "/ai-site-manifest.json",
          headers: expect.arrayContaining([
            { key: "Content-Type", value: "application/json;charset=UTF-8" },
            { key: "X-Robots-Tag", value: "index, follow" }
          ])
        }),
        expect.objectContaining({
          source: "/robots.txt",
          headers: expect.arrayContaining([
            { key: "Content-Type", value: "text/plain;charset=UTF-8" },
            { key: "X-Robots-Tag", value: "index, follow" }
          ])
        }),
        expect.objectContaining({
          source: "/sitemap.xml",
          headers: expect.arrayContaining([
            { key: "Content-Type", value: "application/xml;charset=UTF-8" },
            { key: "X-Robots-Tag", value: "index, follow" }
          ])
        })
      ])
    );
  });

  it("does not configure noindex, noai, or noimageai directives for agent assets", () => {
    const config = JSON.parse(readFileSync(join(process.cwd(), "vercel.json"), "utf8"));
    const restrictedPaths = new Set(["/llms.txt", "/ai-site-manifest.json", "/robots.txt", "/sitemap.xml"]);
    const restrictedHeaders = config.headers.filter((entry: { source: string }) => restrictedPaths.has(entry.source));
    const headerText = JSON.stringify(restrictedHeaders).toLowerCase();

    expect(headerText).not.toContain("noindex");
    expect(headerText).not.toContain("noai");
    expect(headerText).not.toContain("noimageai");
  });
});
