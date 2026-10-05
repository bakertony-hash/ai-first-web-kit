// Fetches a deployment the way browsers and agents do and checks the AI-native contract.
// Pages are discovered from robots.txt -> sitemap.xml, as a crawler would find them.
//
//   AGENT_READABILITY_BASE_URL=http://127.0.0.1:4173 npm run verify:agent-readability
//
// Set VERCEL_AUTOMATION_BYPASS_SECRET to check a protected preview deployment.
import { fileURLToPath } from "node:url";

const BROWSER_ACCEPT = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
const MARKDOWN_ACCEPT = "text/markdown, text/html;q=0.9";
const BLOCKING_ROBOTS = ["noindex", "noai", "noimageai"];

export async function verify(baseUrl) {
  const base = new URL(baseUrl);
  const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  const results = [];

  const check = (target, name, ok, detail = "") => results.push({ target, check: name, ok: Boolean(ok), detail });

  async function get(path, { accept = BROWSER_ACCEPT, redirect = "follow" } = {}) {
    const headers = { accept };
    if (bypassSecret) headers["x-vercel-protection-bypass"] = bypassSecret;
    const response = await fetch(new URL(path, base), { headers, redirect });
    return { response, body: redirect === "manual" ? "" : await response.text() };
  }

  const header = (response, name) => response.headers.get(name) ?? "";
  const contentTypeIs = (response, type) => header(response, "content-type").toLowerCase().startsWith(type);
  const notBlocked = (response) => !BLOCKING_ROBOTS.some((directive) => header(response, "x-robots-tag").toLowerCase().includes(directive));
  const localPath = (absoluteUrl) => new URL(absoluteUrl).pathname;

  // Discovery
  const robots = await get("/robots.txt");
  check("/robots.txt", "200 text/plain", robots.response.ok && contentTypeIs(robots.response, "text/plain"));
  const sitemapUrl = robots.body.match(/^Sitemap:\s*(\S+)/im)?.[1];
  check("/robots.txt", "declares a sitemap", sitemapUrl, sitemapUrl);

  const sitemap = await get(sitemapUrl ? localPath(sitemapUrl) : "/sitemap.xml");
  check("/sitemap.xml", "200 XML", sitemap.response.ok && /xml/.test(header(sitemap.response, "content-type")));
  const pageUrls = [...sitemap.body.matchAll(/<loc>(.+?)<\/loc>/g)].map((match) => match[1]);
  check("/sitemap.xml", "lists pages", pageUrls.length > 0, `${pageUrls.length} pages`);

  // Pages
  const titles = new Map();
  for (const pageUrl of pageUrls) {
    const path = localPath(pageUrl);
    const html = await get(path);
    const h1s = [...html.body.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((match) => match[1].replace(/<[^>]+>/g, "").trim());
    const canonical = html.body.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    const title = html.body.match(/<title>([^<]*)<\/title>/)?.[1];
    const markdownHref = html.body.match(/<link rel="alternate" type="text\/markdown" href="([^"]+)"/)?.[1];
    const jsonLd = html.body.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];

    check(path, "HTML 200", html.response.ok && contentTypeIs(html.response, "text/html"), html.response.status);
    check(path, "exactly one h1 in server HTML", h1s.length === 1, h1s.join(" | "));
    check(path, "self-referencing canonical", canonical === pageUrl, canonical);
    check(path, "unique title", title && !titles.has(title), title);
    titles.set(title, path);
    check(path, "JSON-LD graph in server HTML", jsonLd && Array.isArray(JSON.parse(jsonLd)["@graph"]));
    check(path, "Vary: Accept", /accept/i.test(header(html.response, "vary")), header(html.response, "vary"));
    check(path, "not blocked by X-Robots-Tag", notBlocked(html.response), header(html.response, "x-robots-tag"));

    for (const form of html.body.match(/<form[^>]*>/g) ?? []) {
      const name = form.match(/toolname="([^"]+)"/)?.[1];
      check(path, "form declares a WebMCP tool", name && /tooldescription="[^"]+"/.test(form), name ?? form);
    }

    const negotiated = await get(path, { accept: MARKDOWN_ACCEPT });
    const markdownH1 = negotiated.body.match(/^# (.+)$/m)?.[1];
    check(path, "Accept: text/markdown returns Markdown", negotiated.response.ok && contentTypeIs(negotiated.response, "text/markdown"), header(negotiated.response, "content-type"));
    check(path, "Markdown has the same h1", markdownH1 === h1s[0], markdownH1);
    check(path, "Markdown links its canonical", header(negotiated.response, "link").includes(`<${pageUrl}>; rel="canonical"`));

    check(path, "advertises a Markdown alternate", markdownHref, markdownHref);
    if (markdownHref) {
      const direct = await get(markdownHref);
      check(markdownHref, "200 text/markdown", direct.response.ok && contentTypeIs(direct.response, "text/markdown"));
    }
  }

  // llms.txt
  const llms = await get("/llms.txt");
  check("/llms.txt", "200 text/plain", llms.response.ok && contentTypeIs(llms.response, "text/plain"));
  check("/llms.txt", "H1 then blockquote summary", /^# .+\n\n> .+/.test(llms.body));
  check("/llms.txt", "not blocked by X-Robots-Tag", notBlocked(llms.response));
  const llmsLinks = [...llms.body.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map((match) => match[1]);
  check("/llms.txt", "has absolute Markdown links", llmsLinks.length > 0, `${llmsLinks.length} links`);
  for (const link of llmsLinks.filter((href) => new URL(href).host === new URL(pageUrls[0] ?? base).host)) {
    const linked = await get(localPath(link));
    check("/llms.txt", `link resolves: ${localPath(link)}`, linked.response.ok, linked.response.status);
  }

  // Status codes
  const missing = await get("/this-page-does-not-exist");
  check("/this-page-does-not-exist", "returns 404", missing.response.status === 404, missing.response.status);
  for (const [from, to] of [["/agent-guide", "/interfaces"], ["/examples", "/patterns"]]) {
    const moved = await get(from, { redirect: "manual" });
    check(from, `308 to ${to}`, moved.response.status === 308 && localPath(new URL(header(moved.response, "location"), base)) === to, `${moved.response.status} ${header(moved.response, "location")}`);
  }

  return results;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const baseUrl = process.env.AGENT_READABILITY_BASE_URL ?? "https://ai-first-web-kit.vercel.app";
  const results = await verify(baseUrl);
  const failures = results.filter((result) => !result.ok);

  console.table(results.map(({ target, check, ok, detail }) => ({ target, check, result: ok ? "pass" : "FAIL", detail: String(detail ?? "").slice(0, 60) })));
  console.log(`${results.length - failures.length}/${results.length} checks passed against ${baseUrl}`);
  process.exitCode = failures.length ? 1 : 0;
}
