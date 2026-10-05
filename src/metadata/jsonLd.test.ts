import { describe, expect, it } from "vitest";
import { faqItems, findRoute, routes, site } from "../content/siteContent";
import { jsonLdFor } from "./jsonLd";

function types(path: string) {
  return jsonLdFor(findRoute(path))["@graph"].map((node) => node["@type"]);
}

describe("JSON-LD", () => {
  it.each(routes.map((route) => [route.path, route.pageType] as const))(
    "describes %s as WebSite, Organization and %s",
    (path, pageType) => {
      expect(types(path).slice(0, 3)).toEqual(["WebSite", "Organization", pageType]);
    }
  );

  it("adds the FAQ to the home page and breadcrumbs to subpages", () => {
    expect(types("/")).toContain("FAQPage");
    expect(types("/patterns")).toContain("BreadcrumbList");
    expect(types("/patterns")).not.toContain("FAQPage");
  });

  it("uses the visible FAQ answers", () => {
    const faq = jsonLdFor(findRoute("/"))["@graph"].find((node) => node["@type"] === "FAQPage") as unknown as {
      mainEntity: { name: string; acceptedAnswer: { text: string } }[];
    };

    expect(faq.mainEntity.map((entry) => [entry.name, entry.acceptedAnswer.text])).toEqual(
      faqItems.map((item) => [item.question, item.answer])
    );
  });

  it("points the contact point at GitHub issues instead of a placeholder email", () => {
    const json = JSON.stringify(jsonLdFor(findRoute("/contact")));

    expect(json).toContain(`${site.repoUrl}/issues`);
    expect(json).not.toContain("example.com");
  });

  it("describes only the site on the not-found page", () => {
    expect(types("/nope")).toEqual(["WebSite", "Organization"]);
  });
});
