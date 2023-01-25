import {
  FluentProvider,
  Theme,
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
      theme={isDark ? ttcEtaDarkTheme : ttcEtaLightTheme}
    >
      {children}
    </FluentProvider>
  );
}

export const ttcEtaLightTheme: Theme & {} = {
  ...webLightTheme,
  // Title
  colorBrandForegroundLink: "#9c1b14",
  colorBrandForegroundLinkHover: "#ae1e17",
  colorBrandForegroundLinkPressed: "#841711",
  // icon colos on hover
  colorNeutralForeground2BrandHover: "#ae1e17",
  colorNeutralForeground2BrandPressed: "#841711",
  // buttons, badge
  colorBrandBackground: "#9c1b14",
  colorBrandBackgroundHover: "#ae1e17",
  colorBrandBackgroundPressed: "#841711",
  // transparent badge with colored outline
  colorBrandForeground1: "#9c1b14",
  // radio button; radio button border
  colorCompoundBrandForeground1: "#9c1b14",
  colorCompoundBrandForeground1Hover: "#ae1e17",
  colorCompoundBrandForeground1Pressed: "#841711",
  colorCompoundBrandStroke: "#9c1b14",
  colorCompoundBrandStrokeHover: "#ae1e17",
  colorCompoundBrandStrokePressed: "#841711",
};

export const ttcEtaDarkTheme: Theme & {} = {
  ...webDarkTheme,
  // Title
  colorBrandForegroundLink: "#f54747",
  colorBrandForegroundLinkHover: "#f56161",
  colorBrandForegroundLinkPressed: "#de2929",
  // icon colos on hover
  colorNeutralForeground2BrandHover: "#f56161",
  colorNeutralForeground2BrandPressed: "#de2929",
  // buttons, badge
  colorBrandBackground: "#9c1b14",
  colorBrandBackgroundHover: "#f56161",
  colorBrandBackgroundPressed: "#de2929",
  // transparent badge with colored outline
  colorBrandForeground1: "#f55f47",
  // radio button; radio button border
  colorCompoundBrandForeground1: "#f54747",
  colorCompoundBrandForeground1Hover: "#f56161",
  colorCompoundBrandForeground1Pressed: "#de2929",
  // also on search bar deco
  colorCompoundBrandStroke: "#f54747",
  colorCompoundBrandStrokeHover: "#f56161",
  colorCompoundBrandStrokePressed: "#de2929",
};
