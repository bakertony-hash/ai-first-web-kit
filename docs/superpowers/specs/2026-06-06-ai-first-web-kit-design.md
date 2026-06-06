# AI-First Web Kit Design

Date: 2026-06-06

## Goal

Create an example website optimized for use by AI agents and humans. The site should be a working specimen of AI-first website design: normal users can understand the concepts, while AI agents can reliably discover, summarize, cite, and navigate the site through explicit machine-readable assets and crawl-friendly structure.

The site will be called **AI-First Web Kit**.

## Audience

- Human visitors who want to learn what makes a website easier for AI agents to understand.
- AI agents such as ChatGPT, Claude, and crawler-backed assistants that need stable summaries, task paths, metadata, and canonical URLs.
- Developers inspecting the implementation as a Vite/React example.

## Approach

Use a Vite/React static site. This gives enough component structure to keep content and metadata reusable while keeping the example simple, inspectable, and deployable as static files.

The selected strategy is **Showcase + Specimen**:

- The human-facing site teaches AI-first website patterns.
- The implementation demonstrates those patterns directly.
- Agent-facing assets are first-class routes/files rather than hidden afterthoughts.

## Site Structure

Human-facing routes:

- `/` - overview, canonical summary, agent task list, evidence panel, and key patterns.
- `/patterns` - detailed AI-first website patterns with examples.
- `/agent-guide` - plain-language guidance for AI agents consuming the site.
- `/examples` - concrete examples of page structures, metadata, and task-oriented copy.
- `/contact` - clear contact details and preferred inquiry format.

Agent and crawler assets:

- `/llms.txt` - concise guide for AI agents, with canonical summary, important URLs, allowed tasks, and preferred citations.
- `/robots.txt` - crawler policy and sitemap reference.
- `/sitemap.xml` - canonical route list.
- `/ai-site-manifest.json` - structured manifest describing the site purpose, routes, owner, agent tasks, update cadence, and contact channel.

## User Experience

The first screen is the actual example, not a marketing splash. It leads with the literal identity **AI-First Web Kit**, a short canonical summary, and agent-oriented tasks such as:

- Summarize what this site offers.
- Find the machine-readable guide.
- Compare AI-first website patterns.
- Contact the maintainer.

Below the opening section, an evidence panel lists what agents can discover:

- `llms.txt`
- JSON-LD
- sitemap
- robots policy
- canonical pages
- contact route
- FAQ

The visual direction is clean, technical, and high-trust. It should feel like a practical reference site rather than a SaaS marketing page. The layout should be dense enough for scanning while remaining polished and readable.

## Components

- `Shell`: consistent header, footer, and crawlable navigation links.
- `HeroSummary`: the canonical human and agent summary.
- `AgentTaskList`: task-oriented affordances agents can quote or follow.
- `EvidencePanel`: direct links to machine-readable assets and structured signals.
- `PatternCardGrid`: AI-first website patterns with plain-language descriptions.
- `FAQSection`: human-visible FAQ mirrored by FAQ JSON-LD.
- `ContactPanel`: contact details and preferred inquiry format.

## Content and Data Flow

Site facts should live in one content/config module. UI components and metadata builders should read from this source so visible copy and machine-readable assets do not drift.

Static files should live in `public/` so agents and crawlers can fetch them directly. JSON-LD should be injected on relevant pages from the same source facts used by the visible UI where practical.

## Structured Data

The implementation should include JSON-LD for:

- `WebSite`
- `Organization`
- `FAQPage`
- `HowTo`

Structured data should reinforce visible content, not introduce claims that are absent from the page.

## Agent-First Requirements

The site should make these behaviors reliable:

- An agent can identify the site name, purpose, audience, and canonical summary from the home page and `llms.txt`.
- An agent can find the most important routes without JavaScript execution by using plain links, sitemap, and manifest data.
- An agent can quote stable, concise summaries from visible page sections.
- An agent can distinguish human-facing pages from machine-readable assets.
- An agent can find contact information and preferred inquiry format.
- A crawler can discover the sitemap through `robots.txt`.

## Error Handling and Edge Cases

Because the site is static, runtime failure modes are limited. The design should still handle:

- Missing JavaScript: core content and navigation remain available in the rendered HTML.
- Missing or failed visual assets: content remains understandable without decorative images.
- Metadata drift: reduce by deriving UI and metadata from shared source facts where feasible.
- Broken internal links: verify during implementation with build and browser checks.

## Testing and Verification

Implementation should be verified with:

- `npm run build`
- Browser verification against the local dev server.
- Direct checks that `/llms.txt`, `/ai-site-manifest.json`, `/robots.txt`, and `/sitemap.xml` resolve locally.
- Page inspection for clear headings, visible links, readable layout, and no obvious overlap.

## Out of Scope

- Backend services.
- User accounts.
- CMS integration.
- Live form submission.
- Search-engine ranking guarantees.
- Claims that specific AI products will index or rank the site immediately.

## Open Decisions

No open product decisions remain for the initial implementation plan. Minor visual details can be decided during implementation while preserving the approved structure and tone.
