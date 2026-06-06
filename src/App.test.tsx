import { render, screen } from "@testing-library/react";
import App from "./App";

function renderAt(pathname: string) {
  window.history.pushState({}, "", pathname);
  return render(<App />);
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
