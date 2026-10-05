import { render, screen, within } from "@testing-library/react";
import App from "./App";

function renderAt(pathname: string) {
  return render(<App pathname={pathname} />);
}

test.each([
  ["/", "AI-First Web Kit"],
  ["/patterns", "Patterns"],
  ["/interfaces", "Interfaces"],
  ["/evidence", "Evidence"],
  ["/contact", "Contact"],
  ["/missing", "Page Not Found"]
])("renders %s with the h1 %s", (pathname, heading) => {
  renderAt(pathname);

  expect(screen.getByRole("heading", { level: 1, name: heading })).toBeInTheDocument();
});

test("marks the current page in plain-link navigation", () => {
  renderAt("/patterns");
  const nav = screen.getByRole("navigation", { name: "Primary navigation" });

  for (const name of ["Overview", "Patterns", "Interfaces", "Evidence", "Contact"]) {
    expect(within(nav).getByRole("link", { name })).toBeInTheDocument();
  }
  expect(within(nav).getByRole("link", { name: "Patterns" })).toHaveAttribute("aria-current", "page");
});

test("describes what visitors can do on the home page", () => {
  renderAt("/");

  expect(screen.getByRole("heading", { level: 2, name: "What you can do here" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Fetch any page as Markdown" })).toHaveAttribute("href", "/interfaces");
});

test("gives each pattern a linkable anchor", () => {
  const { container } = renderAt("/patterns");

  expect(container.querySelector("#server-rendered-routes h3")).toHaveTextContent("Server-rendered HTML on every route");
  expect(screen.getByRole("heading", { level: 2, name: "Retired patterns" })).toBeInTheDocument();
});
