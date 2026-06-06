import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the AI-First Web Kit heading", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", { level: 1, name: "AI-First Web Kit" })
  ).toBeInTheDocument();
});
