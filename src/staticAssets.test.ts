import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const publicPath = (...segments: string[]) => join(process.cwd(), "public", ...segments);

describe("agent-facing static assets", () => {
  it("publishes llms.txt with the canonical summary and key routes", () => {
    const content = readFileSync(publicPath("llms.txt"), "utf8");
    expect(content).toContain("# AI-First Web Kit");
    expect(content).toContain("/agent-guide");
    expect(content).toContain("/ai-site-manifest.json");
  });

  it("publishes a parseable AI site manifest", () => {
    const manifest = JSON.parse(readFileSync(publicPath("ai-site-manifest.json"), "utf8"));
    expect(manifest.name).toBe("AI-First Web Kit");
    expect(manifest.url).toBe("https://ai-first-web-kit.vercel.app");
    expect(manifest.routes.map((route: { path: string }) => route.path)).toContain("/contact");
  });

  it("publishes robots and sitemap files", () => {
    expect(readFileSync(publicPath("robots.txt"), "utf8")).toContain(
      "Sitemap: https://ai-first-web-kit.vercel.app/sitemap.xml"
    );
    expect(readFileSync(publicPath("sitemap.xml"), "utf8")).toContain(
      "<loc>https://ai-first-web-kit.vercel.app/patterns</loc>"
    );
  });

  it("keeps all expected asset files present", () => {
    for (const fileName of ["llms.txt", "ai-site-manifest.json", "robots.txt", "sitemap.xml"]) {
      expect(existsSync(publicPath(fileName))).toBe(true);
    }
  });
});
