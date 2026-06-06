import { contact, faqItems, site } from "../content/siteContent";

const context = "https://schema.org";

export function buildWebsiteJsonLd() {
  return {
    "@context": context,
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.canonicalSummary,
    inLanguage: "en"
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": context,
    "@type": "Organization",
    name: site.ownerName,
    url: site.url,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "maintainer",
      email: contact.email,
      description: contact.preferredInquiryFormat
    }
  };
}

export function buildFaqJsonLd() {
  return {
    "@context": context,
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function buildHowToJsonLd() {
  return {
    "@context": context,
    "@type": "HowTo",
    name: "How to consume AI-First Web Kit as an AI agent",
    step: [
      { "@type": "HowToStep", name: "Read the canonical summary", text: "Use the home page h1 and summary to identify the site purpose." },
      { "@type": "HowToStep", name: "Open the agent guide", text: "Fetch /llms.txt and /agent-guide for agent-specific guidance." },
      { "@type": "HowToStep", name: "Use structured assets", text: "Use the sitemap, manifest, and JSON-LD to confirm routes and facts." },
      { "@type": "HowToStep", name: "Cite stable pages", text: "Prefer canonical page URLs and visible section text when citing the site." }
    ]
  };
}

export function allJsonLd() {
  return [buildWebsiteJsonLd(), buildOrganizationJsonLd(), buildFaqJsonLd(), buildHowToJsonLd()];
}
