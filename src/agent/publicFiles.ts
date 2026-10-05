import { routes, site } from "../content/siteContent";
import { canonicalUrl } from "../metadata/head";

export function buildLlmsTxt(): string {
  const pages = routes.map((route) => `- [${route.label}](${canonicalUrl(route.path)}): ${route.description}`);

  return [
    `# ${site.name}`,
    "",
    `> ${site.canonicalSummary}`,
    "",
    "## Pages",
    "",
    ...pages,
    ""
  ].join("\n");
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
