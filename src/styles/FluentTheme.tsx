import {
  FluentProvider,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";
import { useState } from "react";

import { fluentStyles } from "./fluent";

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

export function FluentTheme({ children }: { children: JSX.Element }) {
  const [isDark, setIsDark] = useState(prefersDark);
  const fluentStyle = fluentStyles();

  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      toggleTheme();
    });

  return (
    <FluentProvider
      className={fluentStyle.fluentProvider}
      theme={isDark ? webDarkTheme : webLightTheme}
    >
      {children}
    </FluentProvider>
  );
}
