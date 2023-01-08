import { render, screen } from "@testing-library/react";
// eslint-disable-next-line no-unused-vars
import React from "react";

import App from "./App";

it('renders "TTC bus app"', () => {
  render(<App />);
  const linkElement = screen.getByText(/TTC arrivals/i);
  expect(linkElement).toBeInTheDocument();
});
