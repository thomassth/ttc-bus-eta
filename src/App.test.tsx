/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { App } from "./App";

it('renders "TTC bus app"', () => {
  render(<App />);
  const linkElement = screen.getByText(/TTC bus app/i);
  expect(linkElement).toBeInTheDocument();
});
