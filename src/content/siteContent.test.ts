import { describe, expect, it } from "vitest";
import { findRoute, layers, patterns, routes, webmcpTools } from "./siteContent";

describe("site content", () => {
  it("defines the five routes in navigation order", () => {
    expect(routes.map((route) => route.path)).toEqual(["/", "/patterns", "/interfaces", "/evidence", "/contact"]);
  });

  it("gives every pattern a unique anchor and a known layer", () => {
    const ids = patterns.map((pattern) => pattern.id);
    const layerIds = layers.map((layer) => layer.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(patterns.every((pattern) => layerIds.includes(pattern.layer))).toBe(true);
    for (const layer of layerIds) {
      expect(patterns.some((pattern) => pattern.layer === layer)).toBe(true);
    }
  });

  it("documents each WebMCP tool on a real route", () => {
    for (const tool of Object.values(webmcpTools)) {
      expect(findRoute(tool.page)).toBeDefined();
    }
  });

  it("contains no copy addressed to AI agents as instructions", () => {
    const copy = JSON.stringify({ routes, patterns }).toLowerCase();

    expect(copy).not.toMatch(/preferred agent tasks|citation preference|agent tasks/);
  });

  it("resolves trailing slashes and rejects unknown paths", () => {
    expect(findRoute("/patterns/")?.path).toBe("/patterns");
    expect(findRoute("/agent-guide")).toBeUndefined();
  });
});
