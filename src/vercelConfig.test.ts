import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const config = JSON.parse(readFileSync(join(process.cwd(), "vercel.json"), "utf8"));

function headersFor(source: string): Record<string, string> {
  const entry = config.headers.find((item: { source: string }) => item.source === source);
  return Object.fromEntries((entry?.headers ?? []).map((header: { key: string; value: string }) => [header.key, header.value]));
}

describe("Vercel deployment config", () => {
  it("serves prerendered pages with clean URLs instead of an SPA catch-all", () => {
    expect(config.rewrites).toBeUndefined();
    expect(config.cleanUrls).toBe(true);
    expect(config.trailingSlash).toBe(false);
  });

  it("permanently redirects the retired routes", () => {
    expect(config.redirects).toEqual(
      expect.arrayContaining([
        { source: "/agent-guide", destination: "/interfaces", permanent: true },
        { source: "/examples", destination: "/patterns", permanent: true }
      ])
    );
  });

  it.each([
    ["/llms.txt", "text/plain;charset=UTF-8"],
    ["/robots.txt", "text/plain;charset=UTF-8"],
    ["/sitemap.xml", "application/xml;charset=UTF-8"]
  ])("serves %s as %s without noindex or noai", (source, contentType) => {
    const headers = headersFor(source);

    expect(headers["Content-Type"]).toBe(contentType);
    expect(JSON.stringify(headers).toLowerCase()).not.toMatch(/noindex|noai|noimageai/);
  });
});
