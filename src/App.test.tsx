import { render, screen } from "@testing-library/react";
// eslint-disable-next-line no-unused-vars
import React from "react";

import App from "./App";
import { it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";

vi.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  withTranslation: () => (Component: { defaultProps: any }) => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  },
}));
it('renders "TTC bus app"', () => {
  render(<App />, { wrapper: BrowserRouter });
  expect(screen.getByText("home.title.name")).toBeInTheDocument();
});
