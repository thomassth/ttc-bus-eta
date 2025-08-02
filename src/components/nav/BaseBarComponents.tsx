import { Button, Text } from "@fluentui/react-components";
import {
  ArrowFlowUpRight20Regular,
  ArrowFlowUpRight24Filled,
  Home20Regular,
  Home24Filled,
  Settings20Regular,
  Settings24Filled,
} from "@fluentui/react-icons";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

import { fluentStyles } from "../../styles/fluent";

interface NavItem {
  label: string;
  path: string;
  icon: JSX.Element;
  iconActive: JSX.Element;
}

const navItems: NavItem[] = [
  {
    label: "nav.label.home",
    path: "/",
    icon: <Home20Regular />,
    iconActive: <Home24Filled />,
  },
  {
    label: "nav.label.lines",
    path: "/lines",
    icon: <ArrowFlowUpRight20Regular />,
    iconActive: <ArrowFlowUpRight24Filled />,
  },
  {
    label: "nav.label.settings",
    path: "/settings",
    icon: <Settings20Regular />,
    iconActive: <Settings24Filled />,
  },
];

export function BaseBarComponents({ width }: { width: number }) {
  const { t } = useTranslation();
  const fluentStyle = fluentStyles();

  const getClassName = useCallback(() => {
    switch (true) {
      case width >= 800:
        return fluentStyle.sideNavButton;
      case width >= 360:
        return fluentStyle.bottomNavButton;
      default:
        return fluentStyle.smallRoundNavButton;
    }
  }, [width, fluentStyle]);

  const baseBarComponents = navItems.map((item) => {
    return (
      <li key={t(item.label)}>
        <NavLink
          className={fluentStyle.navButtonLink}
          to={item.path}
          title={t(item.label) ?? item.label}
        >
          {({ isActive }) => (
            <Button
              className={getClassName()}
              shape="circular"
              appearance={isActive ? "primary" : "subtle"}
              icon={isActive ? item.iconActive : item.icon}
              size={width >= 360 ? "medium" : "large"}
              title={t(item.label) ?? item.label}
            >
              {width >= 360 && <Text>{t(item.label)}</Text>}
            </Button>
          )}
        </NavLink>
      </li>
    );
  });

  return <ul> {baseBarComponents}</ul>;
}
