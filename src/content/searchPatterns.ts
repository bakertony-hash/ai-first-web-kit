import { layers, patterns, site } from "./siteContent";
import type { Pattern } from "./siteContent";

export type PatternMatch = {
  id: string;
  title: string;
  layer: string;
  summary: string;
  url: string;
};

function searchableText(pattern: Pattern): string {
  const layer = layers.find((item) => item.id === pattern.layer)?.name ?? "";
  return [pattern.title, pattern.summary, pattern.howThisSiteDoesIt, layer].join(" ").toLowerCase();
}

export function searchPatterns(query: string): PatternMatch[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  return patterns
    .filter((pattern) => terms.every((term) => searchableText(pattern).includes(term)))
    .map((pattern) => ({
      id: pattern.id,
      title: pattern.title,
      layer: layers.find((item) => item.id === pattern.layer)?.name ?? pattern.layer,
      summary: pattern.summary,
      url: `${site.url}/patterns#${pattern.id}`
    }));
}
