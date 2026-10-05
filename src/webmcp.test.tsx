import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderRoute } from "./entry-server";
import { ContactForm } from "./components/ContactForm";
import { PatternSearch } from "./components/PatternSearch";
import { searchPatterns } from "./content/searchPatterns";

function formIn(html: string, toolName: string) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.querySelector(`form[toolname="${toolName}"]`);
}

describe("declarative WebMCP tools in the prerendered HTML", () => {
  it("annotates the read-only pattern search so it can submit itself", () => {
    const form = formIn(renderRoute("/patterns").html, "search_patterns");

    expect(form?.getAttribute("tooldescription")).toMatch(/Search the AI-native website patterns/);
    expect(form?.hasAttribute("toolautosubmit")).toBe(true);
    expect(form?.querySelector('input[name="q"]')?.getAttribute("toolparamdescription")).toBeTruthy();
  });

  it("annotates the contact form but leaves submitting to a person", () => {
    const form = formIn(renderRoute("/contact").html, "contact_maintainer");

    expect(form?.getAttribute("action")).toBe("https://github.com/bakertony-hash/ai-first-web-kit/issues/new");
    expect(form?.getAttribute("method")).toBe("get");
    expect(form?.hasAttribute("toolautosubmit")).toBe(false);
    for (const name of ["title", "body"]) {
      const field = form?.querySelector(`[name="${name}"]`);
      expect(field?.hasAttribute("required")).toBe(true);
      expect(field?.getAttribute("toolparamdescription")).toBeTruthy();
      expect(form?.querySelector(`label[for="${field?.id}"]`)).not.toBeNull();
    }
  });
});

describe("search_patterns", () => {
  it("finds patterns by every term across title, summary and layer", () => {
    expect(searchPatterns("markdown").map((match) => match.id)).toEqual(
      expect.arrayContaining(["markdown-negotiation", "markdown-urls"])
    );
    expect(searchPatterns("operable forms").map((match) => match.id)).toContain("webmcp-forms");
    expect(searchPatterns("   ")).toEqual([]);
  });

  it("answers an agent-invoked submit with structured results", async () => {
    render(<PatternSearch />);
    const respondWith = vi.fn();
    const form = screen.getByRole("search");
    const submit = new Event("submit", { bubbles: true, cancelable: true });
    Object.assign(submit, { agentInvoked: true, respondWith });

    fireEvent.change(screen.getByLabelText("Search patterns"), { target: { value: "markdown" } });
    fireEvent(form, submit);

    expect(respondWith).toHaveBeenCalledTimes(1);
    const payload = JSON.parse(await respondWith.mock.calls[0][0]);
    expect(payload.query).toBe("markdown");
    expect(payload.results.map((result: { id: string }) => result.id)).toContain("markdown-negotiation");
    expect(screen.getByRole("link", { name: "Markdown through content negotiation" })).toHaveAttribute(
      "href",
      "#markdown-negotiation"
    );
  });

  it("does not call respondWith for a person's submit", () => {
    render(<PatternSearch />);
    const respondWith = vi.fn();
    const submit = new Event("submit", { bubbles: true, cancelable: true });
    Object.assign(submit, { respondWith });

    fireEvent.change(screen.getByLabelText("Search patterns"), { target: { value: "lighthouse" } });
    fireEvent(screen.getByRole("search"), submit);

    expect(respondWith).not.toHaveBeenCalled();
    expect(screen.getByText(/match(es)? "lighthouse":/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Lighthouse Agentic Browsing" })).toBeInTheDocument();
  });
});

it("renders the contact form without client-side JavaScript requirements", () => {
  render(<ContactForm />);

  expect(screen.getByRole("button", { name: "Open the draft on GitHub" })).toHaveAttribute("type", "submit");
});
