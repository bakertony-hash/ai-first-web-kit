import TurndownService from "turndown";
import { site } from "../content/siteContent";
import type { Route } from "../content/siteContent";
import { canonicalUrl } from "../metadata/head";

const turndown = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced", bulletListMarker: "-" });

turndown.remove((node) => node.getAttribute?.("aria-hidden") === "true" || node.nodeName === "SCRIPT");

turndown.addRule("absoluteLinks", {
  filter: (node) => node.nodeName === "A" && (node.getAttribute("href") ?? "").startsWith("/"),
  replacement: (content, node) => `[${content}](${site.url}${(node as HTMLElement).getAttribute("href")})`
});

function yamlString(value: string): string {
  return JSON.stringify(value);
}

export function htmlToMarkdown(pageHtml: string, route: Route): string {
  const frontMatter = [
    "---",
    `title: ${yamlString(route.title)}`,
    `description: ${yamlString(route.description)}`,
    `canonical: ${canonicalUrl(route.path)}`,
    `updated: ${site.updated}`,
    "---"
  ].join("\n");

  return `${frontMatter}\n\n${turndown.turndown(pageHtml)}\n`;
}
