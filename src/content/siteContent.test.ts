import { describe, expect, it } from "vitest";
import { agentAssets, agentTasks, contact, examples, faqItems, patterns, routes, site } from "./siteContent";

describe("site content contract", () => {
  it("defines the canonical identity and summary", () => {
    expect(site.name).toBe("AI-First Web Kit");
    expect(site.url).toBe("https://ai-first-web-kit.vercel.app");
    expect(site.canonicalSummary).toContain("working example");
    expect(site.canonicalSummary).toContain("humans");
    expect(site.canonicalSummary).toContain("AI agents");
    expect(site.audience).toContain("AI agents");
  });

  it("defines all human routes", () => {
    expect(routes.map((route) => route.path)).toEqual(["/", "/patterns", "/agent-guide", "/examples", "/contact"]);
  });

  it("defines agent tasks and machine-readable assets", () => {
    expect(agentTasks).toEqual([
      "Summarize what this site offers.",
      "Find the machine-readable guide.",
      "Compare AI-first website patterns.",
      "Contact the maintainer."
    ]);
    expect(agentAssets.map((asset) => asset.path)).toEqual(["/llms.txt", "/ai-site-manifest.json", "/robots.txt", "/sitemap.xml"]);
  });

  it("defines reusable patterns, FAQs, and contact details", () => {
    expect(patterns.map((pattern) => pattern.title)).toEqual([
      "Canonical Summary",
      "Plain Crawlable Navigation",
      "Machine-Readable Guide",
      "Structured Metadata",
      "Task-Oriented Sections",
      "Stable Contact Path"
    ]);
    expect(examples.map((example) => example.title)).toEqual([
      "Agent Task List",
      "Evidence Panel",
      "FAQ Mirroring"
    ]);
    expect(faqItems.map((item) => item.question)).toEqual(expect.arrayContaining([
      "What is AI-First Web Kit?",
      "Does this guarantee visibility in ChatGPT or Claude?",
      "What should agents read first?",
      "Can this pattern work without a backend?"
    ]));
    expect(contact.email).toBe("maintainer@example.com");
    expect(contact.preferredInquiryFormat).toContain("Goal");
  });
});
