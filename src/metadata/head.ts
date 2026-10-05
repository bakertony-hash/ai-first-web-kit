import { markdownPathFor, site } from "../content/siteContent";
import type { PageMeta } from "../content/siteContent";

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function canonicalUrl(path: string): string {
  return path === "/" ? `${site.url}/` : `${site.url}${path}`;
}

export function renderHead(page: PageMeta, isNotFound = false): string {
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const tags = [`<title>${title}</title>`, `<meta name="description" content="${description}" />`];

  if (isNotFound) {
    tags.push('<meta name="robots" content="noindex" />');
  } else {
    const url = canonicalUrl(page.path);
    tags.push(
      `<link rel="canonical" href="${url}" />`,
      `<link rel="alternate" type="text/markdown" href="${markdownPathFor(page.path)}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="${escapeHtml(site.name)}" />`,
      `<meta property="og:title" content="${title}" />`,
      `<meta property="og:description" content="${description}" />`,
      `<meta property="og:url" content="${url}" />`
    );
  }

  const originTrialToken = import.meta.env.VITE_WEBMCP_OT_TOKEN;
  if (originTrialToken) {
    tags.push(`<meta http-equiv="origin-trial" content="${escapeHtml(originTrialToken)}" />`);
  }

  return tags.join("\n    ");
}
