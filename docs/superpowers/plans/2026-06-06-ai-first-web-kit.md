# AI-First Web Kit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static Vite/React website called AI-First Web Kit that is readable by humans and explicit enough for AI agents to summarize, navigate, and cite.

**Architecture:** Use a Vite React app with shared TypeScript content/config as the source of truth for visible UI and metadata. Keep agent-facing files in `public/` and verify them through Vitest plus browser checks against the local dev server.

**Tech Stack:** Vite, React, TypeScript, Vitest, Testing Library, lucide-react, static public assets.

---

## File Structure

- Create `package.json`: npm scripts and dependencies.
- Create `index.html`: Vite entry with root element and base metadata.
- Create `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `vitest.setup.ts`: TypeScript, Vite, and test configuration.
- Create `src/main.tsx`: React bootstrap.
- Create `src/App.tsx`: route selection from `window.location.pathname` and page composition.
- Create `src/styles.css`: global responsive visual system.
- Create `src/content/siteContent.ts`: single source of truth for site name, summary, routes, agent tasks, patterns, examples, FAQs, contact, and asset links.
- Create `src/content/siteContent.test.ts`: content contract tests.
- Create `src/metadata/jsonLd.ts`: JSON-LD builders derived from content.
- Create `src/metadata/jsonLd.test.ts`: structured data tests.
- Create `src/components/Shell.tsx`, `HeroSummary.tsx`, `AgentTaskList.tsx`, `EvidencePanel.tsx`, `PatternCardGrid.tsx`, `FAQSection.tsx`, `ContactPanel.tsx`: focused UI components.
- Create `src/pages/HomePage.tsx`, `PatternsPage.tsx`, `AgentGuidePage.tsx`, `ExamplesPage.tsx`, `ContactPage.tsx`, `NotFoundPage.tsx`: human-facing routes.
- Create `src/App.test.tsx`: render and route smoke tests.
- Create `src/staticAssets.test.ts`: built/public agent asset tests.
- Create `public/llms.txt`, `public/ai-site-manifest.json`, `public/robots.txt`, `public/sitemap.xml`: agent and crawler assets.

## Task 1: Scaffold Vite React Project

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `vitest.setup.ts`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/App.test.tsx`

- [ ] **Step 1: Add npm project configuration**

Create `package.json`:

```json
{
  "name": "ai-first-web-kit",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview --host 127.0.0.1",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@vitejs/plugin-react": "^5.0.0",
    "lucide-react": "^0.468.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "vite": "^7.0.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.0",
    "@types/node": "^22.10.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "jsdom": "^25.0.0",
    "typescript": "^5.7.0",
    "vitest": "^3.0.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`

Expected: `package-lock.json` is created and npm exits with code 0.

- [ ] **Step 3: Add TypeScript and Vite configuration**

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

Create `tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

Create `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    globals: true
  }
});
```

Create `vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Add minimal app entry**

Create `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="AI-First Web Kit is a working example of a website designed for both humans and AI agents." />
    <title>AI-First Web Kit</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Create `src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

Create `src/App.tsx`:

```tsx
export default function App() {
  return (
    <main>
      <h1>AI-First Web Kit</h1>
      <p>A working example of a website designed for humans and AI agents.</p>
    </main>
  );
}
```

Create `src/App.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the site name", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: "AI-First Web Kit" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Run tests**

Run: `npm run test`

Expected: PASS with the App test.

- [ ] **Step 6: Run build**

Run: `npm run build`

Expected: PASS and `dist/` is generated.

- [ ] **Step 7: Commit scaffold**

```bash
git add package.json package-lock.json index.html tsconfig.json tsconfig.node.json vite.config.ts vitest.setup.ts src/main.tsx src/App.tsx src/App.test.tsx
git commit -m "feat: scaffold AI-first React site"
```

## Task 2: Add Shared Site Content Contract

**Files:**
- Create: `src/content/siteContent.ts`
- Create: `src/content/siteContent.test.ts`

- [ ] **Step 1: Write failing content contract tests**

Create `src/content/siteContent.test.ts`:

```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/content/siteContent.test.ts`

Expected: FAIL because `src/content/siteContent.ts` does not exist.

- [ ] **Step 3: Add shared content module**

Create `src/content/siteContent.ts`:

```ts
export const site = {
  name: "AI-First Web Kit",
  url: "https://example.com",
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
  {
    title: "Canonical Summary",
    summary: "Put the site purpose, audience, and most important offer in a stable paragraph that can be quoted directly."
  },
  {
    title: "Plain Crawlable Navigation",
    summary: "Expose important pages through normal anchor links, not only through JavaScript-only interactions."
  },
  {
    title: "Machine-Readable Guide",
    summary: "Publish llms.txt with the most useful URLs, allowed tasks, citation preference, and contact route."
  },
  {
    title: "Structured Metadata",
    summary: "Use JSON-LD to reinforce visible facts about the site, organization, FAQ, and how-to content."
  },
  {
    title: "Task-Oriented Sections",
    summary: "Describe common agent tasks explicitly so assistants can map user intent to the right page."
  },
  {
    title: "Stable Contact Path",
    summary: "Make contact information and preferred inquiry format easy to find from both pages and metadata."
  }
] as const;

export const examples = [
  {
    title: "Agent Task List",
    body: "List tasks in natural language, such as summarize the offer, find pricing, compare options, or contact support."
  },
  {
    title: "Evidence Panel",
    body: "Expose direct links to llms.txt, manifest, sitemap, robots policy, FAQ, and canonical pages."
  },
  {
    title: "FAQ Mirroring",
    body: "Keep visible FAQ text aligned with FAQPage JSON-LD so agents see the same answers in both places."
  }
] as const;

export const faqItems = [
  {
    question: "What is AI-First Web Kit?",
    answer: "AI-First Web Kit is a working example website that demonstrates how to make content easier for AI agents and humans to understand."
  },
  {
    question: "Does this guarantee visibility in ChatGPT or Claude?",
    answer: "No. The site demonstrates discoverability and clarity patterns, but no website can guarantee immediate indexing or ranking by a specific AI product."
  },
  {
    question: "What should agents read first?",
    answer: "Agents should start with /llms.txt, then use the sitemap, manifest, and visible page headings for context."
  },
  {
    question: "Can this pattern work without a backend?",
    answer: "Yes. The example is static, with React-rendered pages and public machine-readable files."
  }
] as const;

export const contact = {
  email: "maintainer@example.com",
  preferredInquiryFormat: "Goal, relevant page URL, question, and requested next action."
} as const;
```

- [ ] **Step 4: Run content tests**

Run: `npm run test -- src/content/siteContent.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit content contract**

```bash
git add src/content/siteContent.ts src/content/siteContent.test.ts
git commit -m "feat: add AI-first site content contract"
```

## Task 3: Add Metadata Builders

**Files:**
- Create: `src/metadata/jsonLd.ts`
- Create: `src/metadata/jsonLd.test.ts`

- [ ] **Step 1: Write failing JSON-LD tests**

Create `src/metadata/jsonLd.test.ts`:

```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/metadata/jsonLd.test.ts`

Expected: FAIL because `src/metadata/jsonLd.ts` does not exist.

- [ ] **Step 3: Add JSON-LD builders**

Create `src/metadata/jsonLd.ts`:

```ts
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
```

- [ ] **Step 4: Run metadata tests**

Run: `npm run test -- src/metadata/jsonLd.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit metadata builders**

```bash
git add src/metadata/jsonLd.ts src/metadata/jsonLd.test.ts
git commit -m "feat: add structured metadata builders"
```

## Task 4: Add Static Agent Assets

**Files:**
- Create: `public/llms.txt`
- Create: `public/ai-site-manifest.json`
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`
- Create: `src/staticAssets.test.ts`

- [ ] **Step 1: Write failing static asset tests**

Create `src/staticAssets.test.ts`:

```ts
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const publicPath = (...segments: string[]) => join(process.cwd(), "public", ...segments);

describe("agent-facing static assets", () => {
  it("publishes llms.txt with the canonical summary and key routes", () => {
    const content = readFileSync(publicPath("llms.txt"), "utf8");
    expect(content).toContain("# AI-First Web Kit");
    expect(content).toContain("/agent-guide");
    expect(content).toContain("/ai-site-manifest.json");
  });

  it("publishes a parseable AI site manifest", () => {
    const manifest = JSON.parse(readFileSync(publicPath("ai-site-manifest.json"), "utf8"));
    expect(manifest.name).toBe("AI-First Web Kit");
    expect(manifest.routes.map((route: { path: string }) => route.path)).toContain("/contact");
  });

  it("publishes robots and sitemap files", () => {
    expect(readFileSync(publicPath("robots.txt"), "utf8")).toContain("Sitemap: https://example.com/sitemap.xml");
    expect(readFileSync(publicPath("sitemap.xml"), "utf8")).toContain("<loc>https://example.com/patterns</loc>");
  });

  it("keeps all expected asset files present", () => {
    for (const fileName of ["llms.txt", "ai-site-manifest.json", "robots.txt", "sitemap.xml"]) {
      expect(existsSync(publicPath(fileName))).toBe(true);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/staticAssets.test.ts`

Expected: FAIL because `public/` asset files do not exist.

- [ ] **Step 3: Add public agent assets**

Create `public/llms.txt`:

```txt
# AI-First Web Kit

Canonical summary:
AI-First Web Kit is a working example of a website designed for humans and AI agents, with clear content, crawlable routes, structured metadata, and machine-readable guidance.

Important URLs:
- / - overview, canonical summary, agent tasks, evidence, and key patterns
- /patterns - AI-first website design patterns
- /agent-guide - plain-language guidance for AI agents
- /examples - concrete examples of metadata, routes, and task-oriented copy
- /contact - maintainer contact details
- /ai-site-manifest.json - structured route and purpose manifest
- /sitemap.xml - canonical route list

Preferred agent tasks:
- Summarize what this site offers.
- Find the machine-readable guide.
- Compare AI-first website patterns.
- Contact the maintainer.

Citation preference:
Prefer visible page URLs and quote concise section text from the page being cited.
```

Create `public/ai-site-manifest.json`:

```json
{
  "name": "AI-First Web Kit",
  "url": "https://example.com",
  "canonicalSummary": "AI-First Web Kit is a working example of a website designed for humans and AI agents, with clear content, crawlable routes, structured metadata, and machine-readable guidance.",
  "audience": ["Human visitors", "AI agents", "Developers"],
  "routes": [
    { "path": "/", "label": "Overview", "purpose": "Canonical summary, agent tasks, evidence, and key patterns." },
    { "path": "/patterns", "label": "Patterns", "purpose": "AI-first website design patterns with examples." },
    { "path": "/agent-guide", "label": "Agent Guide", "purpose": "Plain-language guidance for AI agents consuming this site." },
    { "path": "/examples", "label": "Examples", "purpose": "Concrete examples of metadata, routes, and task-oriented copy." },
    { "path": "/contact", "label": "Contact", "purpose": "Contact details and preferred inquiry format." }
  ],
  "agentTasks": [
    "Summarize what this site offers.",
    "Find the machine-readable guide.",
    "Compare AI-first website patterns.",
    "Contact the maintainer."
  ],
  "contact": {
    "email": "maintainer@example.com",
    "preferredInquiryFormat": "Goal, relevant page URL, question, and requested next action."
  },
  "updateCadence": "Example content is reviewed when the implementation changes."
}
```

Create `public/robots.txt`:

```txt
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
```

Create `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://example.com/</loc></url>
  <url><loc>https://example.com/patterns</loc></url>
  <url><loc>https://example.com/agent-guide</loc></url>
  <url><loc>https://example.com/examples</loc></url>
  <url><loc>https://example.com/contact</loc></url>
  <url><loc>https://example.com/llms.txt</loc></url>
  <url><loc>https://example.com/ai-site-manifest.json</loc></url>
</urlset>
```

- [ ] **Step 4: Run static asset tests**

Run: `npm run test -- src/staticAssets.test.ts`

Expected: PASS.

- [ ] **Step 5: Run build and confirm asset copy**

Run: `npm run build`

Expected: PASS and `dist/llms.txt`, `dist/ai-site-manifest.json`, `dist/robots.txt`, and `dist/sitemap.xml` exist.

- [ ] **Step 6: Commit static assets**

```bash
git add public/llms.txt public/ai-site-manifest.json public/robots.txt public/sitemap.xml src/staticAssets.test.ts
git commit -m "feat: publish agent-facing static assets"
```

## Task 5: Build Pages and Components

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`
- Create: `src/components/Shell.tsx`
- Create: `src/components/HeroSummary.tsx`
- Create: `src/components/AgentTaskList.tsx`
- Create: `src/components/EvidencePanel.tsx`
- Create: `src/components/PatternCardGrid.tsx`
- Create: `src/components/FAQSection.tsx`
- Create: `src/components/ContactPanel.tsx`
- Create: `src/pages/HomePage.tsx`
- Create: `src/pages/PatternsPage.tsx`
- Create: `src/pages/AgentGuidePage.tsx`
- Create: `src/pages/ExamplesPage.tsx`
- Create: `src/pages/ContactPage.tsx`
- Create: `src/pages/NotFoundPage.tsx`

- [ ] **Step 1: Replace App tests with route and content expectations**

Update `src/App.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";

function renderAt(pathname: string) {
  vi.spyOn(window, "location", "get").mockReturnValue({ ...window.location, pathname });
  return render(<App />);
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("App routes", () => {
  it("renders the home page with canonical agent-facing sections", () => {
    renderAt("/");
    expect(screen.getByRole("heading", { level: 1, name: "AI-First Web Kit" })).toBeInTheDocument();
    expect(screen.getByText(/working example of a website designed for humans and AI agents/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Agent Tasks" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Agent Evidence" })).toBeInTheDocument();
  });

  it.each([
    ["/patterns", "Patterns"],
    ["/agent-guide", "Agent Guide"],
    ["/examples", "Examples"],
    ["/contact", "Contact"]
  ])("renders %s", (path, heading) => {
    renderAt(path);
    expect(screen.getByRole("heading", { level: 1, name: heading })).toBeInTheDocument();
  });

  it("renders crawlable navigation links", () => {
    renderAt("/");
    for (const label of ["Overview", "Patterns", "Agent Guide", "Examples", "Contact"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/App.test.tsx`

Expected: FAIL because pages and components do not exist yet.

- [ ] **Step 3: Add UI components**

Create focused component files:

```tsx
// src/components/Shell.tsx
import { routes, site } from "../content/siteContent";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="/">{site.name}</a>
        <nav aria-label="Primary navigation">
          {routes.map((route) => (
            <a key={route.path} href={route.path}>{route.label}</a>
          ))}
        </nav>
      </header>
      {children}
      <footer className="site-footer">
        <p>{site.canonicalSummary}</p>
        <a href="/llms.txt">Read llms.txt</a>
      </footer>
    </div>
  );
}
```

```tsx
// src/components/HeroSummary.tsx
import { Bot, FileSearch } from "lucide-react";
import { site } from "../content/siteContent";

export function HeroSummary() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div>
        <p className="eyebrow">Agent-readable example site</p>
        <h1 id="hero-title">{site.name}</h1>
        <p className="summary">{site.canonicalSummary}</p>
      </div>
      <div className="hero-panel" aria-label="Machine-readable signals">
        <Bot aria-hidden="true" />
        <strong>Built for AI-assisted discovery</strong>
        <span>Stable summaries, crawlable routes, JSON-LD, and direct agent assets.</span>
        <FileSearch aria-hidden="true" />
      </div>
    </section>
  );
}
```

```tsx
// src/components/AgentTaskList.tsx
import { CheckCircle2 } from "lucide-react";
import { agentTasks } from "../content/siteContent";

export function AgentTaskList() {
  return (
    <section className="section" aria-labelledby="agent-tasks">
      <h2 id="agent-tasks">Agent Tasks</h2>
      <div className="task-grid">
        {agentTasks.map((task) => (
          <article className="task-card" key={task}>
            <CheckCircle2 aria-hidden="true" />
            <p>{task}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
```

```tsx
// src/components/EvidencePanel.tsx
import { FileCode2 } from "lucide-react";
import { agentAssets } from "../content/siteContent";

export function EvidencePanel() {
  return (
    <section className="section evidence" aria-labelledby="agent-evidence">
      <h2 id="agent-evidence">Agent Evidence</h2>
      <div className="evidence-grid">
        {agentAssets.map((asset) => (
          <a className="evidence-item" href={asset.path} key={asset.path}>
            <FileCode2 aria-hidden="true" />
            <span><strong>{asset.label}</strong>{asset.description}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
```

```tsx
// src/components/PatternCardGrid.tsx
import { patterns } from "../content/siteContent";

export function PatternCardGrid() {
  return (
    <section className="section" aria-labelledby="patterns-heading">
      <h2 id="patterns-heading">AI-First Website Patterns</h2>
      <div className="card-grid">
        {patterns.map((pattern) => (
          <article className="info-card" key={pattern.title}>
            <h3>{pattern.title}</h3>
            <p>{pattern.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
```

```tsx
// src/components/FAQSection.tsx
import { faqItems } from "../content/siteContent";

export function FAQSection() {
  return (
    <section className="section" aria-labelledby="faq-heading">
      <h2 id="faq-heading">FAQ</h2>
      <div className="faq-list">
        {faqItems.map((item) => (
          <article key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
```

```tsx
// src/components/ContactPanel.tsx
import { Mail } from "lucide-react";
import { contact } from "../content/siteContent";

export function ContactPanel() {
  return (
    <section className="section contact-panel" aria-labelledby="contact-heading">
      <Mail aria-hidden="true" />
      <div>
        <h2 id="contact-heading">Contact</h2>
        <p>Email: <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
        <p>Preferred format: {contact.preferredInquiryFormat}</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add pages and route selection**

Create page files and update `src/App.tsx`:

```tsx
// src/pages/HomePage.tsx
import { AgentTaskList } from "../components/AgentTaskList";
import { EvidencePanel } from "../components/EvidencePanel";
import { FAQSection } from "../components/FAQSection";
import { HeroSummary } from "../components/HeroSummary";
import { PatternCardGrid } from "../components/PatternCardGrid";

export function HomePage() {
  return (
    <main>
      <HeroSummary />
      <AgentTaskList />
      <EvidencePanel />
      <PatternCardGrid />
      <FAQSection />
    </main>
  );
}
```

```tsx
// src/pages/PatternsPage.tsx
import { PatternCardGrid } from "../components/PatternCardGrid";

export function PatternsPage() {
  return (
    <main className="page">
      <h1>Patterns</h1>
      <p className="lede">Use these patterns to make a site easier for agents to inspect, summarize, and route through.</p>
      <PatternCardGrid />
    </main>
  );
}
```

```tsx
// src/pages/AgentGuidePage.tsx
import { agentAssets, agentTasks, site } from "../content/siteContent";

export function AgentGuidePage() {
  return (
    <main className="page">
      <h1>Agent Guide</h1>
      <p className="lede">{site.canonicalSummary}</p>
      <h2>Recommended Tasks</h2>
      <ul>{agentTasks.map((task) => <li key={task}>{task}</li>)}</ul>
      <h2>Machine-Readable Assets</h2>
      <ul>{agentAssets.map((asset) => <li key={asset.path}><a href={asset.path}>{asset.label}</a>: {asset.description}</li>)}</ul>
    </main>
  );
}
```

```tsx
// src/pages/ExamplesPage.tsx
import { examples } from "../content/siteContent";

export function ExamplesPage() {
  return (
    <main className="page">
      <h1>Examples</h1>
      <p className="lede">Concrete examples of content structures that help humans and AI agents reach the same facts.</p>
      <div className="card-grid">{examples.map((example) => <article className="info-card" key={example.title}><h2>{example.title}</h2><p>{example.body}</p></article>)}</div>
    </main>
  );
}
```

```tsx
// src/pages/ContactPage.tsx
import { ContactPanel } from "../components/ContactPanel";

export function ContactPage() {
  return (
    <main className="page">
      <h1>Contact</h1>
      <p className="lede">Use this route when an agent or human needs a stable maintainer contact path.</p>
      <ContactPanel />
    </main>
  );
}
```

```tsx
// src/pages/NotFoundPage.tsx
export function NotFoundPage() {
  return (
    <main className="page">
      <h1>Page Not Found</h1>
      <p>The requested page is not part of the AI-First Web Kit example.</p>
      <a href="/">Return to overview</a>
    </main>
  );
}
```

```tsx
// src/App.tsx
import { Shell } from "./components/Shell";
import { AgentGuidePage } from "./pages/AgentGuidePage";
import { ContactPage } from "./pages/ContactPage";
import { ExamplesPage } from "./pages/ExamplesPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PatternsPage } from "./pages/PatternsPage";

const pages: Record<string, React.ReactNode> = {
  "/": <HomePage />,
  "/patterns": <PatternsPage />,
  "/agent-guide": <AgentGuidePage />,
  "/examples": <ExamplesPage />,
  "/contact": <ContactPage />
};

export default function App() {
  const pathname = window.location.pathname.replace(/\/$/, "") || "/";
  return <Shell>{pages[pathname] ?? <NotFoundPage />}</Shell>;
}
```

- [ ] **Step 5: Run App tests**

Run: `npm run test -- src/App.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit pages and components**

```bash
git add src/App.tsx src/App.test.tsx src/components src/pages
git commit -m "feat: build AI-first site pages"
```

## Task 6: Add JSON-LD Injection and Visual Styling

**Files:**
- Modify: `src/App.tsx`
- Create or Modify: `src/styles.css`
- Modify: `src/App.test.tsx`

- [ ] **Step 1: Add test for JSON-LD scripts**

Append to `src/App.test.tsx`:

```tsx
it("injects structured JSON-LD metadata", () => {
  renderAt("/");
  const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
  const parsed = scripts.map((script) => JSON.parse(script.textContent ?? "{}"));
  expect(parsed.map((item) => item["@type"])).toEqual(["WebSite", "Organization", "FAQPage", "HowTo"]);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/App.test.tsx`

Expected: FAIL because JSON-LD scripts are not injected.

- [ ] **Step 3: Inject JSON-LD and add responsive styles**

Update `src/App.tsx` to render JSON-LD scripts before `Shell`:

```tsx
import { Shell } from "./components/Shell";
import { allJsonLd } from "./metadata/jsonLd";
import { AgentGuidePage } from "./pages/AgentGuidePage";
import { ContactPage } from "./pages/ContactPage";
import { ExamplesPage } from "./pages/ExamplesPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PatternsPage } from "./pages/PatternsPage";

const pages: Record<string, React.ReactNode> = {
  "/": <HomePage />,
  "/patterns": <PatternsPage />,
  "/agent-guide": <AgentGuidePage />,
  "/examples": <ExamplesPage />,
  "/contact": <ContactPage />
};

export default function App() {
  const pathname = window.location.pathname.replace(/\/$/, "") || "/";
  return (
    <>
      {allJsonLd().map((item) => (
        <script
          key={item["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
      <Shell>{pages[pathname] ?? <NotFoundPage />}</Shell>
    </>
  );
}
```

Create `src/styles.css`:

```css
:root {
  color: #17211b;
  background: #f6f8f4;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.5;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  background: #f6f8f4;
}

a {
  color: #195f50;
}

.site-shell {
  min-height: 100vh;
}

.site-header,
.site-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  max-width: 1180px;
  margin: 0 auto;
  padding: 18px 24px;
}

.site-header nav {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.brand {
  color: #17211b;
  font-weight: 800;
  text-decoration: none;
}

.hero,
.page,
.section {
  max-width: 1180px;
  margin: 0 auto;
  padding: 40px 24px;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(280px, 0.55fr);
  gap: 28px;
  align-items: stretch;
}

h1 {
  max-width: 780px;
  margin: 0 0 16px;
  font-size: clamp(2.6rem, 7vw, 5.8rem);
  line-height: 0.95;
  letter-spacing: 0;
}

h2,
h3,
p {
  letter-spacing: 0;
}

.eyebrow {
  margin: 0 0 12px;
  color: #5f3b18;
  font-weight: 800;
  text-transform: uppercase;
}

.summary,
.lede {
  max-width: 760px;
  color: #334138;
  font-size: 1.15rem;
}

.hero-panel,
.task-card,
.info-card,
.contact-panel,
.faq-list article,
.evidence-item {
  border: 1px solid #cad4c6;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 1px 0 rgba(23, 33, 27, 0.05);
}

.hero-panel {
  display: grid;
  gap: 14px;
  align-content: center;
  padding: 24px;
}

.task-grid,
.evidence-grid,
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.task-card,
.info-card,
.evidence-item,
.contact-panel,
.faq-list article {
  padding: 18px;
}

.task-card {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.evidence-item {
  display: flex;
  gap: 12px;
  color: inherit;
  text-decoration: none;
}

.evidence-item span {
  display: grid;
  gap: 4px;
}

.faq-list {
  display: grid;
  gap: 14px;
}

.contact-panel {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.site-footer {
  align-items: flex-start;
  border-top: 1px solid #cad4c6;
  color: #506057;
}

.site-footer p {
  max-width: 760px;
  margin: 0;
}

svg {
  flex: 0 0 auto;
  color: #195f50;
}

@media (max-width: 760px) {
  .site-header,
  .site-footer,
  .hero {
    grid-template-columns: 1fr;
    align-items: flex-start;
  }

  .site-header,
  .site-footer {
    flex-direction: column;
  }

  .hero,
  .page,
  .section {
    padding: 30px 18px;
  }
}
```

- [ ] **Step 4: Run tests and build**

Run: `npm run test && npm run build`

Expected: PASS.

- [ ] **Step 5: Commit metadata injection and styling**

```bash
git add src/App.tsx src/App.test.tsx src/styles.css
git commit -m "feat: add metadata injection and responsive styling"
```

## Task 7: Final Browser and Asset Verification

**Files:**
- No source edits expected unless verification exposes a defect.

- [ ] **Step 1: Run full automated verification**

Run: `npm run test && npm run build`

Expected: PASS.

- [ ] **Step 2: Start local dev server**

Run: `npm run dev -- --port 5173`

Expected: Vite reports a local URL such as `http://127.0.0.1:5173/`.

- [ ] **Step 3: Verify pages in browser**

Use the in-app browser to open:

- `http://127.0.0.1:5173/`
- `http://127.0.0.1:5173/patterns`
- `http://127.0.0.1:5173/agent-guide`
- `http://127.0.0.1:5173/examples`
- `http://127.0.0.1:5173/contact`

Expected:

- Home page has `h1` text `AI-First Web Kit`.
- Home page shows canonical summary, Agent Tasks, Agent Evidence, pattern cards, and FAQ.
- Each route shows its expected `h1`.
- Header links are visible and clickable.
- Desktop viewport has no visible overlap.
- Mobile viewport around 390px wide has no clipped text or overlapping controls.

- [ ] **Step 4: Verify static assets in browser or shell**

Open or request:

- `http://127.0.0.1:5173/llms.txt`
- `http://127.0.0.1:5173/ai-site-manifest.json`
- `http://127.0.0.1:5173/robots.txt`
- `http://127.0.0.1:5173/sitemap.xml`

Expected:

- `llms.txt` includes the canonical summary and important URLs.
- `ai-site-manifest.json` parses as JSON and includes `/contact`.
- `robots.txt` includes the sitemap URL.
- `sitemap.xml` includes all human-facing pages.

- [ ] **Step 5: Fix any verification defects**

If a defect is found, write or update the narrowest test that catches it, make the smallest code change, rerun `npm run test && npm run build`, and repeat browser verification for the affected page or asset.

- [ ] **Step 6: Commit verification fixes if needed**

If Step 5 changed files:

```bash
git add <changed-files>
git commit -m "fix: address AI-first site verification issues"
```

If no files changed, do not create an empty commit.
