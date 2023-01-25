import {
  FluentProvider,
  PartialTheme,
  Theme,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";
import { useState } from "react";

import { fluentStyles } from "./fluent";

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const ttcPalate: PartialTheme = {
  // Title
  colorBrandForegroundLink: "#ae1e17",
  colorBrandForegroundLinkHover: "#ae1e17",
  colorBrandForegroundLinkPressed: "#5e110c",
  // icon colos on hover
  colorNeutralForeground2BrandHover: "#ae1e17",
  colorNeutralForeground2BrandPressed: "#5e110c",
  // buttons, badge
  colorBrandBackground: "#9c1b14",
  colorBrandBackgroundHover: "#70130e",
  colorBrandBackgroundPressed: "#5e110c",
  // transparent badge with colored outline
  colorBrandForeground1: "#f54747",
  // radio button; radio button border
  colorCompoundBrandForeground1: "#9c1b14",
  colorCompoundBrandForeground1Hover: "#ae1e17",
  colorCompoundBrandForeground1Pressed: "#5e110c",
  colorCompoundBrandStroke: "#9c1b14",
  colorCompoundBrandStrokeHover: "#ae1e17",
  colorCompoundBrandStrokePressed: "#5e110c",
};

export const ttcEtaLightTheme: Theme = {
  ...webLightTheme,
  ...ttcPalate,
};

export const ttcEtaDarkTheme: Theme = {
  ...webDarkTheme,
  ...ttcPalate,
};

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
      theme={isDark ? ttcEtaDarkTheme : ttcEtaLightTheme}
    >
      {children}
    </FluentProvider>
  );
}
