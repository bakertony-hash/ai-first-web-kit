import { evidenceDate } from "../content/evidence";
import { contact, faqItems, patterns, routes, site } from "../content/siteContent";
import type { Route } from "../content/siteContent";
import { canonicalUrl } from "./head";

type JsonLdNode = Record<string, unknown> & { "@type": string };

export type JsonLdGraph = {
  "@context": "https://schema.org";
  "@graph": JsonLdNode[];
};

const websiteId = `${site.url}/#website`;
const organizationId = `${site.url}/#organization`;

function websiteNode(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    name: site.name,
    url: canonicalUrl("/"),
    description: site.canonicalSummary,
    inLanguage: "en",
    publisher: { "@id": organizationId }
  };
}

function organizationNode(): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: site.name,
    url: canonicalUrl("/"),
    sameAs: [site.repoUrl],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "maintainer",
      url: contact.issuesUrl
    }
  };
}

function pageNode(route: Route): JsonLdNode {
  const url = canonicalUrl(route.path);
  const node: JsonLdNode = {
    "@type": route.pageType,
    "@id": `${url}#webpage`,
    url,
    name: route.title,
    description: route.description,
    inLanguage: "en",
    isPartOf: { "@id": websiteId },
    dateModified: route.path === "/evidence" ? evidenceDate : site.updated
  };

  if (route.pageType === "TechArticle") {
    node.headline = route.label;
    node.author = { "@id": organizationId };
  }

  if (route.path === "/patterns") {
    node.mainEntity = {
      "@type": "ItemList",
      numberOfItems: patterns.length,
      itemListElement: patterns.map((pattern, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: pattern.title,
        url: `${url}#${pattern.id}`
      }))
    };
  }

  return node;
}

function breadcrumbNode(route: Route): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: routes[0].label, item: canonicalUrl("/") },
      { "@type": "ListItem", position: 2, name: route.label, item: canonicalUrl(route.path) }
    ]
  };
}

function faqNode(): JsonLdNode {
  return {
    "@type": "FAQPage",
    "@id": `${canonicalUrl("/")}#faq`,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };
}

export function jsonLdFor(route: Route | undefined): JsonLdGraph {
  const graph = [websiteNode(), organizationNode()];

  if (route) {
    graph.push(pageNode(route));
    graph.push(route.path === "/" ? faqNode() : breadcrumbNode(route));
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
