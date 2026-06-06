import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("page layout styles", () => {
  it("does not apply hero layout through broad main child selectors", () => {
    const css = readFileSync(join(process.cwd(), "src", "styles.css"), "utf8");

    expect(css).not.toContain("main > section:first-child");
  });

  it("does not constrain every h1 to hero heading width", () => {
    const css = readFileSync(join(process.cwd(), "src", "styles.css"), "utf8");

    expect(css).not.toMatch(/^h1\s*{[^}]*max-width/m);
    expect(css).toContain(".hero h1 {\n  max-width");
  });

  it("left-aligns standard page intro paragraphs", () => {
    const css = readFileSync(join(process.cwd(), "src", "styles.css"), "utf8");
    const introRule = css.match(/main > h1 \+ p\s*{(?<body>[^}]*)}/s);

    expect(introRule?.groups?.body).toBeDefined();
    expect(introRule?.groups?.body).not.toContain("max-width");
    expect(introRule?.groups?.body).not.toContain("margin-left: 0");
  });

  it("removes bullet markers from every page section list", () => {
    const css = readFileSync(join(process.cwd(), "src", "styles.css"), "utf8");
    const listRule = css.match(/^ul\s*{(?<body>[^}]*)}/m);

    expect(listRule?.groups?.body).toBeDefined();
    expect(listRule?.groups?.body).toContain("padding-left: 0");
    expect(listRule?.groups?.body).toContain("list-style: none");
    expect(css).not.toContain("main > section:not(:first-child) ul");
  });

  it("defines the dark AI kit visual tokens", () => {
    const css = readFileSync(join(process.cwd(), "src", "styles.css"), "utf8");

    expect(css).toContain("--bg: #03070b");
    expect(css).toContain("--surface: rgb(13 21 27 / 72%)");
    expect(css).toContain("--accent: #7cf5d0");
    expect(css).toContain("--glow: 0 0 42px rgb(124 245 208 / 25%)");
  });

  it("keeps the reskin scoped to explicit component classes", () => {
    const css = readFileSync(join(process.cwd(), "src", "styles.css"), "utf8");

    expect(css).toContain(".subpage {");
    expect(css).toContain(".subpage-intro {");
    expect(css).toContain(".page-panel {");
    expect(css).toContain(".hero {");
    expect(css).toContain(".signal-map {");
    expect(css).toContain(".feature-strip {");
    expect(css).toContain(".workbench {");
    expect(css).toContain(".pattern-card {");
    expect(css).toContain(".faq-list {");
    expect(css).not.toContain("main > section article");
  });

  it("does not rely on negative letter spacing for the reskin", () => {
    const css = readFileSync(join(process.cwd(), "src", "styles.css"), "utf8");

    expect(css).not.toMatch(/letter-spacing:\s*-/);
  });
});
