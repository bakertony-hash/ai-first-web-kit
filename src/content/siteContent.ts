export const site = {
  name: "AI-First Web Kit",
  url: "https://ai-first-web-kit.vercel.app",
  repoUrl: "https://github.com/bakertony-hash/ai-first-web-kit",
  canonicalSummary:
    "AI-First Web Kit is a working example of an AI-native website. Every page is server-rendered HTML with a Markdown version, its structured data matches what you can see, its forms work as WebMCP tools for browser agents, and the results are measured and published.",
  updated: "2026-10-05"
} as const;

export const routes = [
  {
    path: "/",
    label: "Overview",
    title: "AI-First Web Kit: what makes a website AI native in 2026",
    description:
      "A working example of an AI-native website: readable, fetchable and operable by AI agents, with the results measured.",
    pageType: "WebPage"
  },
  {
    path: "/patterns",
    label: "Patterns",
    title: "Patterns | AI-First Web Kit",
    description:
      "AI-native website patterns grouped by layer, how this site applies each one, and the patterns it has retired.",
    pageType: "CollectionPage"
  },
  {
    path: "/interfaces",
    label: "Interfaces",
    title: "Interfaces | AI-First Web Kit",
    description:
      "The machine interfaces this site offers: Markdown versions, llms.txt, sitemap, structured data and WebMCP tools.",
    pageType: "TechArticle"
  },
  {
    path: "/evidence",
    label: "Evidence",
    title: "Evidence | AI-First Web Kit",
    description: "Lighthouse Agentic Browsing results and verifier checks for every page of this site.",
    pageType: "WebPage"
  },
  {
    path: "/contact",
    label: "Contact",
    title: "Contact | AI-First Web Kit",
    description: "Ask a question or report a problem by drafting a GitHub issue to the maintainer.",
    pageType: "ContactPage"
  }
] as const;

export type Route = (typeof routes)[number];
export type RoutePath = Route["path"];

export const notFoundRoute = {
  path: "/404",
  label: "Not Found",
  title: "Page Not Found | AI-First Web Kit",
  description: "The requested page is not part of the AI-First Web Kit example."
} as const;

export type PageMeta = Route | typeof notFoundRoute;

export function normalizePath(pathname: string): string {
  return pathname === "/" ? pathname : pathname.replace(/\/+$/, "") || "/";
}

export function findRoute(pathname: string): Route | undefined {
  const path = normalizePath(pathname);
  return routes.find((route) => route.path === path);
}

export type Source = { label: string; url: string };

const sources = {
  webDevAgents: {
    label: "Search Engine Journal: Google tells developers to build for AI agents",
    url: "https://www.searchenginejournal.com/google-tells-developers-to-build-for-ai-agents-not-just-humans/517606/"
  },
  llmsTxtStudy: {
    label: "PPC Land: llms.txt adoption rises 8.8x but 97% of files get zero AI requests",
    url: "https://ppc.land/llms-txt-adoption-rises-8-8x-but-97-of-files-get-zero-ai-requests/"
  },
  llmsTxtSpec: { label: "llms.txt specification", url: "https://llmstxt.org/" },
  webmcpDeclarative: {
    label: "Chrome for Developers: WebMCP declarative API",
    url: "https://developer.chrome.com/docs/ai/webmcp/declarative-api"
  },
  lighthouseAgentic: {
    label: "Chrome for Developers: Lighthouse Agentic Browsing audits",
    url: "https://developer.chrome.com/docs/lighthouse/agentic-browsing/registered-webmcp-tools"
  },
  ardSpec: { label: "Agentic Resource Discovery specification", url: "https://agenticresourcediscovery.org/spec/" },
  ardLighthouse: {
    label: "Search Engine Journal: Lighthouse adds an ARD audit",
    url: "https://www.searchenginejournal.com/google-lighthouse-ai-agent-resource-discovery-audit/590274/"
  },
  agenticCommerce: {
    label: "Cloudflare: Securing agentic commerce",
    url: "https://blog.cloudflare.com/secure-agentic-commerce/"
  }
} satisfies Record<string, Source>;

export const layers = [
  {
    id: "readable",
    name: "Readable",
    summary: "Agents can understand every page from its HTML alone, without running JavaScript."
  },
  {
    id: "fetchable",
    name: "Fetchable",
    summary: "Agents can get the content cheaply, as Markdown, without parsing a full page."
  },
  {
    id: "operable",
    name: "Operable",
    summary: "Agents can take actions through declared tools, and people confirm anything with consequences."
  },
  {
    id: "measurable",
    name: "Measurable",
    summary: "The claims above are checked by audits and tests, and the results are published."
  }
] as const;

export type LayerId = (typeof layers)[number]["id"];

export type Pattern = {
  id: string;
  layer: LayerId;
  title: string;
  summary: string;
  howThisSiteDoesIt: string;
  sourcePath: string;
  sources: Source[];
};

export const patterns: Pattern[] = [
  {
    id: "server-rendered-routes",
    layer: "readable",
    title: "Server-rendered HTML on every route",
    summary:
      "Every URL returns its own complete HTML. Most AI crawlers don't run JavaScript, so a client-only app looks empty, or identical on every route.",
    howThisSiteDoesIt:
      "Each route is rendered with React's renderToString at build time into its own HTML file. The browser hydrates it only for the two interactive forms.",
    sourcePath: "scripts/prerender.mjs",
    sources: [sources.webDevAgents]
  },
  {
    id: "accessibility-tree",
    layer: "readable",
    title: "Semantic HTML and a clean accessibility tree",
    summary:
      "Agents read the accessibility tree, the same map screen readers use. That needs one h1, real headings, labelled inputs, real buttons and plain links.",
    howThisSiteDoesIt:
      "Every page has one h1, landmark regions and labelled form controls. An axe-core check runs over every rendered page in the test suite.",
    sourcePath: "src/a11y.test.ts",
    sources: [sources.webDevAgents]
  },
  {
    id: "per-route-metadata",
    layer: "readable",
    title: "Per-route metadata and real status codes",
    summary:
      "Each URL has its own title, description and self-referencing canonical. Missing pages return 404 and moved pages redirect permanently.",
    howThisSiteDoesIt:
      "Head tags are built for each route from one route table. Unknown paths get a 404 page, and the old /agent-guide and /examples URLs redirect with 308.",
    sourcePath: "src/metadata/head.ts",
    sources: []
  },
  {
    id: "structured-data",
    layer: "readable",
    title: "Structured data that matches the page",
    summary:
      "JSON-LD in the server HTML repeats facts that are visible on the page: who publishes it, what kind of page it is, and its questions and answers.",
    howThisSiteDoesIt:
      "Each page emits one JSON-LD graph built from the same content module the page renders, so the FAQ answers in the structured data are the FAQ answers on screen.",
    sourcePath: "src/metadata/jsonLd.ts",
    sources: []
  },
  {
    id: "describe-dont-instruct",
    layer: "readable",
    title: "Describe what people can do, not what agents should do",
    summary:
      "Well-built agents treat text addressed to them as untrusted input, as a defence against prompt injection. Plain descriptions of what the site offers work for both audiences.",
    howThisSiteDoesIt:
      "The home page lists what you can do here. Nothing on the site is phrased as instructions to an AI.",
    sourcePath: "src/pages/HomePage.tsx",
    sources: []
  },
  {
    id: "stable-layout",
    layer: "readable",
    title: "Stable layout",
    summary:
      "Content doesn't move after it loads. Lighthouse counts Cumulative Layout Shift in its Agentic Browsing category.",
    howThisSiteDoesIt:
      "The HTML arrives complete and hydration doesn't change it. There are no web fonts, late banners or content swapped in by JavaScript.",
    sourcePath: "index.html",
    sources: [sources.lighthouseAgentic]
  },
  {
    id: "markdown-negotiation",
    layer: "fetchable",
    title: "Markdown through content negotiation",
    summary:
      "A request that sends Accept: text/markdown gets a Markdown version of the page, with Vary: Accept so caches keep the two versions apart.",
    howThisSiteDoesIt:
      "Routing middleware rewrites Markdown requests to a .md copy that is generated at build time from the same rendered HTML.",
    sourcePath: "middleware.ts",
    sources: []
  },
  {
    id: "markdown-urls",
    layer: "fetchable",
    title: "A .md URL for every page",
    summary:
      "Each page has a Markdown copy at a predictable URL, linked from the HTML head with rel=\"alternate\" and type=\"text/markdown\".",
    howThisSiteDoesIt: "/patterns has /patterns.md, and the home page has /index.md.",
    sourcePath: "src/agent/markdown.ts",
    sources: []
  },
  {
    id: "llms-txt",
    layer: "fetchable",
    title: "llms.txt for coding agents",
    summary:
      "A Markdown index of the site at /llms.txt, plus /llms-full.txt with every page in one file. Coding agents and AI IDEs read these. Most AI crawlers don't.",
    howThisSiteDoesIt:
      "Both files are generated from the route table at build time, in the format the llms.txt specification describes: an H1, a summary, and lists of links.",
    sourcePath: "src/agent/publicFiles.ts",
    sources: [sources.llmsTxtSpec, sources.llmsTxtStudy]
  },
  {
    id: "crawler-policy",
    layer: "fetchable",
    title: "A deliberate crawler policy",
    summary:
      "robots.txt states who may crawl and points to the sitemap. Training crawlers and retrieval agents can be allowed or blocked separately.",
    howThisSiteDoesIt:
      "This site allows every crawler, because its purpose is to be read. The sitemap is generated from the route table.",
    sourcePath: "public/robots.txt",
    sources: []
  },
  {
    id: "webmcp-forms",
    layer: "operable",
    title: "Forms that are also WebMCP tools",
    summary:
      "Adding toolname and tooldescription to an ordinary form lets a browser agent discover it as a tool, with a JSON Schema built from the form's fields.",
    howThisSiteDoesIt:
      "The pattern search and the contact form are both annotated. Neither needs JavaScript to work for people.",
    sourcePath: "src/components/PatternSearch.tsx",
    sources: [sources.webmcpDeclarative]
  },
  {
    id: "human-confirmation",
    layer: "operable",
    title: "People confirm anything with consequences",
    summary:
      "Read-only tools can run straight away. For tools that send, post or buy, the agent fills in the form and a person does the final submit.",
    howThisSiteDoesIt:
      "search_patterns submits automatically. contact_maintainer doesn't, and it only drafts a GitHub issue that you submit yourself.",
    sourcePath: "src/components/ContactForm.tsx",
    sources: [sources.webmcpDeclarative]
  },
  {
    id: "lighthouse-agentic",
    layer: "measurable",
    title: "Lighthouse Agentic Browsing",
    summary:
      "Lighthouse 13.3 added an Agentic Browsing category that checks the accessibility tree, layout shift, llms.txt and WebMCP tools. It reports a pass count rather than a score.",
    howThisSiteDoesIt:
      "The results for every page are published on the Evidence page, including anything that didn't pass.",
    sourcePath: "scripts/audit-agentic.mjs",
    sources: [sources.lighthouseAgentic]
  },
  {
    id: "contract-checks",
    layer: "measurable",
    title: "Checks that run on every change",
    summary: "Tests and a deployment verifier fail when a route, header or machine-readable file drifts.",
    howThisSiteDoesIt:
      "The verifier fetches every page the way a browser does and the way an agent does, and CI runs it against a local build.",
    sourcePath: "scripts/verify-agent-readability.mjs",
    sources: []
  }
];

export const retiredPatterns = [
  {
    title: "Custom AI manifests",
    why: "This site used to publish /ai-site-manifest.json. No agent or crawler reads custom manifest formats, so its facts moved into schema.org JSON-LD."
  },
  {
    title: "Agent task lists and instructions",
    why: "\"Agent Tasks\" and \"citation preference\" copy was addressed to AI agents. Agents treat that kind of text as untrusted, so it doesn't steer them."
  },
  {
    title: "A single-page app with a homepage fallback",
    why: "A client-rendered app with a catch-all rewrite served the homepage, its title and its canonical at every URL, including URLs that don't exist."
  },
  {
    title: "HowTo structured data aimed at agents",
    why: "JSON-LD describing how an agent should read the site is instructions in another format. Structured data should describe the page, not direct the reader."
  },
  {
    title: "llms.txt as the main lever",
    why: "It's a cheap extra for coding agents, not a ranking or citation signal. 97% of llms.txt files got no requests in May 2026."
  }
] as const;

export const watching: { title: string; status: string; why: string; sources: Source[] }[] = [
  {
    title: "Agentic Resource Discovery (ARD)",
    status: "v0.91 proposal, August 2026. Audited by Lighthouse 13.5.",
    why: "A catalog of callable resources, such as MCP servers, A2A agents and skills, at /.well-known/ard.json. This site offers none of those, so it publishes no catalog.",
    sources: [sources.ardSpec, sources.ardLighthouse]
  },
  {
    title: "Imperative WebMCP tools",
    status: "Chrome origin trial.",
    why: "document.modelContext.registerTool() covers actions that aren't forms. Every action on this site is a form, so the declarative API is enough.",
    sources: [sources.webmcpDeclarative]
  },
  {
    title: "Agent identity and payments",
    status: "In use by commerce platforms.",
    why: "Web Bot Auth identifies signed agents, and protocols such as Visa's Trusted Agent Protocol, Google's AP2 and Stripe and Tempo's Machine Payments Protocol let agents pay. A static site with nothing to sell doesn't need them.",
    sources: [sources.agenticCommerce]
  }
];

export const faqItems = [
  {
    question: "What is AI-First Web Kit?",
    answer:
      "A small static website, built with Vite and React, that applies current AI-native patterns to itself and links each pattern to the file that implements it."
  },
  {
    question: "What makes a website AI native in 2026?",
    answer:
      "An agent can read it cheaply, understand it reliably and take actions on it, and the owner measures that. In practice that means server-rendered semantic HTML, Markdown versions of pages, forms annotated as WebMCP tools, and Lighthouse's Agentic Browsing checks."
  },
  {
    question: "Does llms.txt matter?",
    answer:
      "A little. Coding agents and AI IDEs read it when pointed at a site. An Ahrefs study of 137,210 domains found that 97% of llms.txt files received no requests in May 2026, and no major AI platform says it uses them for citations."
  },
  {
    question: "Do AI agents use WebMCP yet?",
    answer:
      "Not widely, as of October 2026. Chrome has an origin trial and Lighthouse audits WebMCP tools, but few sites publish them and no mainstream agent calls them yet. The annotations cost nothing, and the forms work normally without them."
  },
  {
    question: "Does this guarantee visibility in ChatGPT or Claude?",
    answer:
      "No. These patterns make a site easier to read and use, but no website can guarantee indexing, ranking or citation by a specific AI product."
  },
  {
    question: "Can this work without a backend?",
    answer:
      "Yes. Every page is a static file. The only server code is a small routing middleware that serves Markdown when a request asks for it."
  }
] as const;

export type WebMcpTool = {
  name: string;
  description: string;
  page: RoutePath;
  autoSubmit: boolean;
  params: { name: string; label: string; description: string }[];
};

export const webmcpTools = {
  searchPatterns: {
    name: "search_patterns",
    description:
      "Search the AI-native website patterns on this site by keyword. Returns the matching patterns with their layer, summary and URL.",
    page: "/patterns",
    autoSubmit: true,
    params: [
      {
        name: "q",
        label: "Search patterns",
        description: "Keywords to match against pattern titles and summaries, for example markdown or accessibility."
      }
    ]
  },
  contactMaintainer: {
    name: "contact_maintainer",
    description:
      "Draft a GitHub issue to the maintainer of this site. It opens a prefilled issue that the user reviews and submits; nothing is sent automatically.",
    page: "/contact",
    autoSubmit: false,
    params: [
      { name: "title", label: "Subject", description: "A one-line summary of the question or report." },
      {
        name: "body",
        label: "Message",
        description: "The question or report, including the URL of the page it is about."
      }
    ]
  }
} satisfies Record<string, WebMcpTool>;

export const contact = {
  issuesUrl: `${site.repoUrl}/issues`,
  newIssueUrl: `${site.repoUrl}/issues/new`
} as const;

export const machineInterfaces = [
  { path: "/index.md", label: "Markdown pages", description: "Every page as Markdown, at its path plus .md or by sending Accept: text/markdown." },
  { path: "/llms.txt", label: "llms.txt", description: "A Markdown index of the site's pages." },
  { path: "/llms-full.txt", label: "llms-full.txt", description: "Every page's Markdown in one file." },
  { path: "/sitemap.xml", label: "Sitemap", description: "The canonical list of page URLs." },
  { path: "/robots.txt", label: "Robots policy", description: "Crawler policy and sitemap location." }
] as const;
