import {
  FluentProvider,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";
import { useState } from "react";
import { prefersDark } from "./theme";

export const FluentTheme = ({ children }: { children: JSX.Element }) => {
  const [isDark, setIsDark] = useState(prefersDark);

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      toggleTheme();
    });

  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  return (
    <FluentProvider theme={isDark ? webDarkTheme : webLightTheme}>
      {children}
    </FluentProvider>
  );
};
