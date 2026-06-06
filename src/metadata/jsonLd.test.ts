import { describe, expect, it } from "vitest";
import { contact, faqItems, site } from "../content/siteContent";
import { allJsonLd, buildFaqJsonLd, buildHowToJsonLd, buildOrganizationJsonLd, buildWebsiteJsonLd } from "./jsonLd";

describe("JSON-LD builders", () => {
  it("builds WebSite JSON-LD from canonical site facts", () => {
    const jsonLd = buildWebsiteJsonLd();
    expect(jsonLd["@context"]).toBe("https://schema.org");
    expect(jsonLd["@type"]).toBe("WebSite");
    expect(jsonLd.name).toBe(site.name);
    expect(jsonLd.url).toBe(site.url);
    expect(jsonLd.description).toBe(site.canonicalSummary);
    expect(jsonLd.inLanguage).toBe("en");
  });

  it("builds Organization JSON-LD with contact point", () => {
    const jsonLd = buildOrganizationJsonLd();
    expect(jsonLd["@context"]).toBe("https://schema.org");
    expect(jsonLd["@type"]).toBe("Organization");
    expect(jsonLd.name).toBe(site.ownerName);
    expect(jsonLd.url).toBe(site.url);
    expect(jsonLd.contactPoint["@type"]).toBe("ContactPoint");
    expect(jsonLd.contactPoint.contactType).toBe("maintainer");
    expect(jsonLd.contactPoint.email).toBe(contact.email);
    expect(jsonLd.contactPoint.description).toBe(contact.preferredInquiryFormat);
  });

  it("builds FAQPage JSON-LD from visible FAQ items", () => {
    const jsonLd = buildFaqJsonLd();
    expect(jsonLd["@type"]).toBe("FAQPage");
    expect(jsonLd.mainEntity.map((entry) => entry.name)).toEqual(faqItems.map((item) => item.question));
    expect(jsonLd.mainEntity.map((entry) => entry.acceptedAnswer.text)).toEqual(faqItems.map((item) => item.answer));
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

  it("builds all JSON-LD entries in stable order", () => {
    expect(allJsonLd().map((item) => item["@type"])).toEqual(["WebSite", "Organization", "FAQPage", "HowTo"]);
  });
});
