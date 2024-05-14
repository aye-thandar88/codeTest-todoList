import { render, screen } from "@testing-library/react";
import App from "./App";

test("display title", () => {
  render(<App />);
  const linkElement = screen.getByText("TODO");
  expect(linkElement).toBeInTheDocument();
});
