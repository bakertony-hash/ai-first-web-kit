// Runs Lighthouse's Agentic Browsing category and the readability verifier against a
// deployment, then writes the results to src/content/evidence.json for the Evidence page.
//
//   AUDIT_BASE_URL=https://ai-first-web-kit.vercel.app CHROME_PATH=/path/to/chrome npm run audit:agentic
//
// WebMCP is behind a flag in Chrome 154, so the audit enables it; without that, the
// three WebMCP audits report "not applicable". Use a Chrome that supports WebMCP
// (146+); older builds skip those audits.
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { verify } from "./verify-agent-readability.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const baseUrl = process.env.AUDIT_BASE_URL ?? "https://ai-first-web-kit.vercel.app";
const chromeFlags = ["--headless=new", "--no-sandbox", "--enable-features=WebMCPTesting,DevToolsWebMCPSupport"];

async function pagePaths() {
  const sitemap = await (await fetch(new URL("/sitemap.xml", baseUrl))).text();
  return [...sitemap.matchAll(/<loc>(.+?)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
}

const chrome = await chromeLauncher.launch({ chromeFlags });
// Ask the running browser rather than spawning `chrome --version`: on Windows that
// hands off to an open Chrome window instead of printing a version.
const { Browser: chromeVersion } = await (await fetch(`http://127.0.0.1:${chrome.port}/json/version`)).json();
const pages = [];
const webmcpTools = [];
let lighthouseVersion = "";

try {
  for (const path of await pagePaths()) {
    const { lhr } = await lighthouse(new URL(path, baseUrl).href, {
      port: chrome.port,
      onlyCategories: ["agentic-browsing"],
      logLevel: "error"
    });
    lighthouseVersion = lhr.lighthouseVersion;

    const audits = lhr.categories["agentic-browsing"].auditRefs.map(({ id }) => {
      const audit = lhr.audits[id];
      return {
        id,
        title: audit.title,
        score: audit.score,
        scoreDisplayMode: audit.scoreDisplayMode,
        displayValue: audit.displayValue ?? ""
      };
    });

    for (const section of lhr.audits["webmcp-registered-tools"].details?.items ?? []) {
      for (const tool of section.value?.items ?? []) {
        webmcpTools.push({ page: path, name: tool.tool, description: tool.description, kind: section.title });
      }
    }

    pages.push({ path, audits });
    console.log(path, audits.map((audit) => `${audit.id}=${audit.score ?? audit.scoreDisplayMode}`).join(" "));
  }
} finally {
  chrome.kill();
}

const checks = await verify(baseUrl);
const failures = checks.filter((check) => !check.ok);

const evidence = {
  generatedAt: new Date().toISOString(),
  targetUrl: baseUrl,
  lighthouseVersion,
  chromeVersion,
  chromeFlags,
  pages,
  webmcpTools,
  verifier: {
    passed: checks.length - failures.length,
    total: checks.length,
    failures: failures.map(({ target, check, detail }) => ({ target, check, detail: String(detail ?? "") }))
  }
};

await writeFile(join(root, "src/content/evidence.json"), `${JSON.stringify(evidence, null, 2)}\n`);
console.log(`Wrote src/content/evidence.json: ${pages.length} pages, verifier ${evidence.verifier.passed}/${evidence.verifier.total}`);
