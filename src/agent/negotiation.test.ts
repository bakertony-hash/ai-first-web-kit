import { describe, expect, it } from "vitest";
import { prefersMarkdown } from "./negotiation";

describe("prefersMarkdown", () => {
  it.each([
    ["Chrome navigation", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,*/*;q=0.8", false],
    ["curl default", "*/*", false],
    ["missing header", null, false],
    ["Markdown only", "text/markdown", true],
    ["Markdown preferred over HTML", "text/markdown, text/html;q=0.9, */*;q=0.8", true],
    ["Markdown tied with a wildcard", "text/markdown, */*", true],
    ["HTML preferred over Markdown", "text/markdown;q=0.5, text/html", false],
    ["Markdown refused", "text/markdown;q=0, */*", false],
    ["case and spacing", " Text/Markdown ; q=1.0 ", true]
  ])("%s", (_name, accept, expected) => {
    expect(prefersMarkdown(accept)).toBe(expected);
  });
});
