import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("HTML fallback content", () => {
  const requiredFragments = [
    "<h1>AI-First Web Kit</h1>",
    "AI-First Web Kit is a working example of a website designed for humans and AI agents",
    'href="/patterns"',
    'href="/agent-guide"',
    'href="/examples"',
    'href="/contact"',
    "Agent Tasks",
    "Summarize what this site offers.",
    "Find the machine-readable guide.",
    "Compare AI-first website patterns.",
    "Contact the maintainer.",
    "Agent Evidence",
    'href="/llms.txt"',
    'href="/ai-site-manifest.json"',
    'href="/robots.txt"',
    'href="/sitemap.xml"'
  ];

  it("keeps core content and navigation available before JavaScript runs", () => {
    const html = readFileSync(join(process.cwd(), "index.html"), "utf8");

    for (const fragment of requiredFragments) {
      expect(html).toContain(fragment);
    }
  });

  it("keeps fallback content in the built HTML when dist is present", () => {
    const distIndex = join(process.cwd(), "dist", "index.html");
    if (!existsSync(distIndex)) {
      return;
    }

    const html = readFileSync(distIndex, "utf8");

    for (const fragment of requiredFragments) {
      expect(html).toContain(fragment);
    }
  });
});
