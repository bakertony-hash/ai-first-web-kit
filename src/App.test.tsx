import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

function renderAt(pathname: string) {
  window.history.pushState({}, "", pathname);
  const root = document.createElement("div");
  root.setAttribute("id", "root");
  document.body.append(root);
  return render(<App />, { container: root });
}

test("renders the homepage summary, agent tasks, and agent evidence", () => {
  renderAt("/");

  expect(
    screen.getByRole("heading", { level: 1, name: "AI-First Web Kit" })
  ).toBeInTheDocument();
  expect(
    screen.getAllByText(/working example of a website designed for humans and AI agents/i)
      .length
  ).toBeGreaterThan(0);
  expect(
    screen.getByRole("heading", { level: 2, name: "Agent Tasks" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { level: 2, name: "Agent Evidence" })
  ).toBeInTheDocument();
});

test("renders homepage reskin landmarks and primary actions", () => {
  renderAt("/");

  expect(document.querySelector(".hero")).toBeInTheDocument();
  expect(document.querySelector(".signal-map")).toBeInTheDocument();
  expect(document.querySelector(".feature-strip")).toBeInTheDocument();
  expect(document.querySelector(".workbench")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /read the guide/i })).toHaveAttribute(
    "href",
    "/agent-guide"
  );
  expect(screen.getByRole("link", { name: /view patterns/i })).toHaveAttribute(
    "href",
    "/patterns"
  );
});

test.each([
  ["/patterns", "Patterns"],
  ["/agent-guide", "Agent Guide"],
  ["/examples", "Examples"],
  ["/contact", "Contact"]
])("renders %s with the expected h1", (pathname, heading) => {
  renderAt(pathname);

  expect(screen.getByRole("heading", { level: 1, name: heading })).toBeInTheDocument();
});

test("renders crawlable navigation links on the homepage", () => {
  renderAt("/");

  for (const name of ["Overview", "Patterns", "Agent Guide", "Examples", "Contact"]) {
    expect(screen.getByRole("link", { name })).toBeInTheDocument();
  }
});

test("uses client-side navigation for app route links", async () => {
  const user = userEvent.setup();
  renderAt("/");

  await user.click(screen.getByRole("link", { name: "Patterns" }));

  expect(window.location.pathname).toBe("/patterns");
  expect(screen.getByRole("heading", { level: 1, name: "Patterns" })).toBeInTheDocument();
});

it("injects structured JSON-LD metadata", () => {
  renderAt("/");
  const firstRootChild = document.getElementById("root")?.firstElementChild;
  const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
  const parsed = scripts.map((script) => JSON.parse(script.textContent ?? "{}"));

  expect(firstRootChild?.tagName).toBe("SCRIPT");
  expect(firstRootChild).toHaveAttribute("type", "application/ld+json");
  expect(parsed.map((item) => item["@type"])).toEqual(["WebSite", "Organization", "FAQPage", "HowTo"]);
});

test.each([
  [
    "/patterns",
    "Use these patterns to make a site easier for agents to inspect, summarize, and route through."
  ],
  [
    "/examples",
    "Concrete examples of content structures that help humans and AI agents reach the same facts."
  ],
  [
    "/contact",
    "Use this route when an agent or human needs a stable maintainer contact path."
  ],
  [
    "/missing",
    "The requested page is not part of the AI-First Web Kit example."
  ]
])("renders planned page copy for %s", (pathname, copy) => {
  renderAt(pathname);

  expect(screen.getByText(copy)).toBeInTheDocument();
});

test.each([
  ["/agent-guide", "Agent Guide"],
  ["/contact", "Contact"]
])("applies the subpage skin to %s", (pathname, heading) => {
  renderAt(pathname);

  expect(document.querySelector(".subpage")).toBeInTheDocument();
  expect(document.querySelector(".subpage-intro")).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 1, name: heading })).toBeInTheDocument();
  expect(document.querySelector(".page-panel")).toBeInTheDocument();
});
