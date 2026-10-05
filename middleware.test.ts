import { describe, expect, it } from "vitest";
import middleware, { config } from "./middleware";
import { markdownPathFor, routes, site } from "./src/content/siteContent";

const origin = "https://example.test";

function request(path: string, accept?: string) {
  return middleware(new Request(`${origin}${path}`, { headers: accept ? { accept } : {} }));
}

describe("routing middleware", () => {
  it("rewrites a Markdown request to the page's .md file", () => {
    const response = request("/patterns", "text/markdown");

    expect(response.headers.get("x-middleware-rewrite")).toBe(`${origin}/patterns.md`);
    expect(response.headers.get("vary")).toBe("Accept");
    expect(response.headers.get("link")).toBe(`<${site.url}/patterns>; rel="canonical"`);
  });

  it("maps the home page to /index.md", () => {
    expect(request("/", "text/markdown").headers.get("x-middleware-rewrite")).toBe(`${origin}/index.md`);
  });

  it("passes browser requests through with Vary: Accept", () => {
    const response = request("/patterns", "text/html,application/xhtml+xml,*/*;q=0.8");

    expect(response.headers.get("x-middleware-rewrite")).toBeNull();
    expect(response.headers.get("x-middleware-next")).toBe("1");
    expect(response.headers.get("vary")).toBe("Accept");
  });

  it("adds a canonical link to direct .md requests", () => {
    const response = request("/contact.md");

    expect(response.headers.get("x-middleware-next")).toBe("1");
    expect(response.headers.get("link")).toBe(`<${site.url}/contact>; rel="canonical"`);
  });

  it("matches every page route and its Markdown path", () => {
    expect(config.matcher).toEqual([
      ...routes.map((route) => route.path),
      ...routes.map((route) => markdownPathFor(route.path))
    ]);
  });
});
