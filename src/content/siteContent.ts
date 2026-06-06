export const site = {
  name: "AI-First Web Kit",
  url: "https://ai-first-web-kit.vercel.app",
  canonicalSummary:
    "AI-First Web Kit is a working example of a website designed for humans and AI agents, with clear content, crawlable routes, structured metadata, and machine-readable guidance.",
  audience: ["Human visitors", "AI agents", "Developers"],
  ownerName: "AI-First Web Kit Maintainer",
  updateCadence: "Example content is reviewed when the implementation changes."
} as const;

export const routes = [
  { path: "/", label: "Overview", description: "Canonical summary, agent tasks, evidence, and key patterns." },
  { path: "/patterns", label: "Patterns", description: "AI-first website design patterns with examples." },
  { path: "/agent-guide", label: "Agent Guide", description: "Plain-language guidance for AI agents consuming this site." },
  { path: "/examples", label: "Examples", description: "Concrete examples of metadata, routes, and task-oriented copy." },
  { path: "/contact", label: "Contact", description: "Contact details and preferred inquiry format." }
] as const;

export const agentTasks = [
  "Summarize what this site offers.",
  "Find the machine-readable guide.",
  "Compare AI-first website patterns.",
  "Contact the maintainer."
] as const;

export const agentAssets = [
  { path: "/llms.txt", label: "llms.txt", description: "Concise guide for AI agents." },
  { path: "/ai-site-manifest.json", label: "AI site manifest", description: "Structured route and purpose manifest." },
  { path: "/robots.txt", label: "Robots policy", description: "Crawler policy and sitemap reference." },
  { path: "/sitemap.xml", label: "Sitemap", description: "Canonical route list." }
] as const;

export const patterns = [
  { title: "Canonical Summary", summary: "Put the site purpose, audience, and most important offer in a stable paragraph that can be quoted directly." },
  { title: "Plain Crawlable Navigation", summary: "Expose important pages through normal anchor links, not only through JavaScript-only interactions." },
  { title: "Machine-Readable Guide", summary: "Publish llms.txt with the most useful URLs, allowed tasks, citation preference, and contact route." },
  { title: "Structured Metadata", summary: "Use JSON-LD to reinforce visible facts about the site, organization, FAQ, and how-to content." },
  { title: "Task-Oriented Sections", summary: "Describe common agent tasks explicitly so assistants can map user intent to the right page." },
  { title: "Stable Contact Path", summary: "Make contact information and preferred inquiry format easy to find from both pages and metadata." }
] as const;

export const examples = [
  { title: "Agent Task List", body: "List tasks in natural language, such as summarize the offer, find pricing, compare options, or contact support." },
  { title: "Evidence Panel", body: "Expose direct links to llms.txt, manifest, sitemap, robots policy, FAQ, and canonical pages." },
  { title: "FAQ Mirroring", body: "Keep visible FAQ text aligned with FAQPage JSON-LD so agents see the same answers in both places." }
] as const;

export const faqItems = [
  { question: "What is AI-First Web Kit?", answer: "AI-First Web Kit is a working example website that demonstrates how to make content easier for AI agents and humans to understand." },
  { question: "Does this guarantee visibility in ChatGPT or Claude?", answer: "No. The site demonstrates discoverability and clarity patterns, but no website can guarantee immediate indexing or ranking by a specific AI product." },
  { question: "What should agents read first?", answer: "Agents should start with /llms.txt, then use the sitemap, manifest, and visible page headings for context." },
  { question: "Can this pattern work without a backend?", answer: "Yes. The example is static, with React-rendered pages and public machine-readable files." }
] as const;

export const contact = {
  email: "maintainer@example.com",
  preferredInquiryFormat: "Goal, relevant page URL, question, and requested next action."
} as const;
