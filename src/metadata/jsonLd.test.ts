import { describe, expect, it } from "vitest";
import { buildFaqJsonLd, buildHowToJsonLd, buildOrganizationJsonLd, buildWebsiteJsonLd } from "./jsonLd";

describe("JSON-LD builders", () => {
  it("builds WebSite JSON-LD from canonical site facts", () => {
    const jsonLd = buildWebsiteJsonLd();
    expect(jsonLd["@type"]).toBe("WebSite");
    expect(jsonLd.name).toBe("AI-First Web Kit");
    expect(jsonLd.description).toContain("working example");
  });

  it("builds Organization JSON-LD with contact point", () => {
    const jsonLd = buildOrganizationJsonLd();
    expect(jsonLd["@type"]).toBe("Organization");
    expect(jsonLd.contactPoint.email).toBe("maintainer@example.com");
  });

  it("builds FAQPage JSON-LD from visible FAQ items", () => {
    const jsonLd = buildFaqJsonLd();
    expect(jsonLd["@type"]).toBe("FAQPage");
    expect(jsonLd.mainEntity).toHaveLength(4);
    expect(jsonLd.mainEntity[0].acceptedAnswer.text).toContain("working example website");
  });

  it("builds HowTo JSON-LD for AI-first site consumption", () => {
    const jsonLd = buildHowToJsonLd();
    expect(jsonLd["@type"]).toBe("HowTo");
    expect(jsonLd.step.map((step) => step.name)).toEqual([
      "Read the canonical summary",
      "Open the agent guide",
      "Use structured assets",
      "Cite stable pages"
    ]);
  });
});
