import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("HTML fallback content", () => {
  it("keeps core content and navigation available before JavaScript runs", () => {
    const html = readFileSync(join(process.cwd(), "index.html"), "utf8");

    expect(html).toContain("<h1>AI-First Web Kit</h1>");
    expect(html).toContain("AI-First Web Kit is a working example of a website designed for humans and AI agents");
    expect(html).toContain('href="/patterns"');
    expect(html).toContain('href="/agent-guide"');
    expect(html).toContain('href="/examples"');
    expect(html).toContain('href="/contact"');
    expect(html).toContain('href="/llms.txt"');
    expect(html).toContain('href="/ai-site-manifest.json"');
  });
});
