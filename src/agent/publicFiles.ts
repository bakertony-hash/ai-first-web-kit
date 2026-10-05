import { markdownPathFor, routes, site } from "../content/siteContent";
import { canonicalUrl } from "../metadata/head";

export function buildLlmsTxt(): string {
  const pages = routes.map(
    (route) => `- [${route.label}](${site.url}${markdownPathFor(route.path)}): ${route.description}`
  );

  return [
    `# ${site.name}`,
    "",
    `> ${site.canonicalSummary}`,
    "",
    "Every page is available as Markdown: the links below point to the .md versions, and each HTML URL returns Markdown when the request sends Accept: text/markdown.",
    "",
    "## Pages",
    "",
    ...pages,
    "",
    "## Optional",
    "",
    `- [Full site as one Markdown file](${site.url}/llms-full.txt): Every page above, concatenated.`,
    `- [Source code](${site.repoUrl}): The repository for this site.`,
    ""
  ].join("\n");
}

export function buildLlmsFullTxt(pageMarkdown: string[]): string {
  return [`# ${site.name}`, "", `> ${site.canonicalSummary}`, "", ...pageMarkdown].join("\n");
}

export function buildSitemap(): string {
  const urls = routes.map(
    (route) => `  <url><loc>${canonicalUrl(route.path)}</loc><lastmod>${site.updated}</lastmod></url>`
  );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    ""
  ].join("\n");
}
