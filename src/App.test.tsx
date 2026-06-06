import { render, screen } from "@testing-library/react";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import App from "./App";

test("renders the AI-First Web Kit heading", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", { level: 1, name: "AI-First Web Kit" })
  ).toBeInTheDocument();
});

test("loads the scaffold stylesheet from the app entry point", () => {
  const mainSource = readFileSync(resolve("src/main.tsx"), "utf8");

  expect(mainSource).toContain('import "./styles.css";');
  expect(existsSync(resolve("src/styles.css"))).toBe(true);
});
