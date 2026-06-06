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
});
