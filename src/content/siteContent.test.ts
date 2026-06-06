import { describe, expect, it } from "vitest";
import { agentAssets, agentTasks, contact, faqItems, patterns, routes, site } from "./siteContent";

describe("site content contract", () => {
  it("defines the canonical identity and summary", () => {
    expect(site.name).toBe("AI-First Web Kit");
    expect(site.canonicalSummary).toContain("working example");
    expect(site.audience).toContain("AI agents");
  });

  it("defines all human routes", () => {
    expect(routes.map((route) => route.path)).toEqual(["/", "/patterns", "/agent-guide", "/examples", "/contact"]);
  });

  it("defines agent tasks and machine-readable assets", () => {
    expect(agentTasks).toHaveLength(4);
    expect(agentAssets.map((asset) => asset.path)).toEqual(["/llms.txt", "/ai-site-manifest.json", "/robots.txt", "/sitemap.xml"]);
  });

  it("defines reusable patterns, FAQs, and contact details", () => {
    expect(patterns.length).toBeGreaterThanOrEqual(6);
    expect(faqItems.length).toBeGreaterThanOrEqual(4);
    expect(contact.email).toBe("maintainer@example.com");
    expect(contact.preferredInquiryFormat).toContain("Goal");
  });
});
