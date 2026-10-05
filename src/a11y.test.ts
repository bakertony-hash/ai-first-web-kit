import axe from "axe-core";
import { describe, expect, it } from "vitest";
import { notFoundPath, renderRoute, routePaths } from "./entry-server";

describe("accessibility tree", () => {
  it.each([...routePaths, notFoundPath])("has no axe violations on %s", async (path) => {
    const { head, html } = renderRoute(path);
    document.documentElement.lang = "en";
    document.head.innerHTML = head;
    document.body.innerHTML = `<div id="root">${html}</div>`;

    const results = await axe.run(document, {
      rules: { "color-contrast": { enabled: false } }
    });

    expect(results.passes.length).toBeGreaterThan(10);
    expect(results.violations.map((violation) => `${violation.id}: ${violation.nodes.map((node) => node.target).join(", ")}`)).toEqual([]);
  });
});
