import { Button, Text } from "@fluentui/react-components";
import {
  ArrowRouting20Regular,
  ArrowRouting24Filled,
  Home20Regular,
  Home24Filled,
  QuestionCircle20Regular,
  QuestionCircle24Filled,
} from "@fluentui/react-icons";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { fluentStyles } from "../../styles/fluent";

interface NavItem {
  label: string;
  prefix: string;
  path: string;
  icon: JSX.Element;
  iconActive: JSX.Element;
}

const navItems: NavItem[] = [
  {
    label: "nav.label.home",
    prefix: `${process.env.PUBLIC_URL}`,
    path: ``,
    icon: <Home20Regular />,
    iconActive: <Home24Filled />,
  },
  {
    label: "nav.label.lines",
    prefix: `${process.env.PUBLIC_URL}`,
    path: `/lines`,
    icon: <ArrowRouting20Regular />,
    iconActive: <ArrowRouting24Filled />,
  },
  {
    label: "nav.label.about",
    prefix: `${process.env.PUBLIC_URL}`,
    path: `/about`,
    icon: <QuestionCircle20Regular />,
    iconActive: <QuestionCircle24Filled />,
  },
];

export function BaseBarComponents({ width }: { width: number }) {
  const { t } = useTranslation();
  const fluentStyle = fluentStyles();

  const getClassName = useCallback(
    (width: number) => {
      switch (true) {
        case width > 800:
          return fluentStyle.sideNavButton;
        case width > 390:
          return fluentStyle.bottomNavButton;
        default:
          return fluentStyle.smallRoundNavButton;
      }
    },
    [width]
  );

  const BottomNavItems = navItems.map((item) => {
    return (
      <NavLink
        className={fluentStyle.navButtonLink}
        to={item.path}
        key={t(item.label)}
        title={t(item.label) ?? item.label}
      >
        {({ isActive }) => (
          <Button
            className={getClassName(width)}
            shape="circular"
            appearance={isActive ? "primary" : "subtle"}
            icon={isActive ? item.iconActive : item.icon}
            size={width > 390 ? "medium" : "large"}
            title={t(item.label) ?? item.label}
          >
            {width > 390 && <Text>{t(item.label)}</Text>}
          </Button>
        )}
      </NavLink>
    );
  });

  return <>{BottomNavItems}</>;
}
