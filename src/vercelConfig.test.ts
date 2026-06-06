import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("Vercel deployment config", () => {
  it("rewrites app routes to index.html for direct links", () => {
    const config = JSON.parse(readFileSync(join(process.cwd(), "vercel.json"), "utf8"));

    expect(config.rewrites).toContainEqual({
      source: "/((?!api|.*\\..*).*)",
      destination: "/index.html"
    });
  });
});
