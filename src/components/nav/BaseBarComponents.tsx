import { Button, Text } from "@fluentui/react-components";
import {
  ArrowRouting20Regular,
  ArrowRouting24Filled,
  Home20Regular,
  Home24Filled,
  Settings20Regular,
  Settings24Filled,
} from "@fluentui/react-icons";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { NavItem } from "../../models/nav";
import { fluentStyles } from "../../styles/fluent";

export function BaseBarComponents({ width }: { width: number }) {
  const { t } = useTranslation();
  const fluentStyle = fluentStyles();

  const navItems: NavItem[] = useMemo(() => {
    return [
      {
        label: "nav.label.home",
        path: `/`,
        icon: <Home20Regular />,
        iconActive: <Home24Filled />,
      },
      {
        label: "nav.label.lines",
        path: `/lines`,
        icon: <ArrowRouting20Regular />,
        iconActive: <ArrowRouting24Filled />,
      },
      {
        label: "nav.label.settings",
        path: `/settings`,
        icon: <Settings20Regular />,
        iconActive: <Settings24Filled />,
      },
    ];
  }, []);

  const isLargerThanDefaultPhone = useCallback(() => {
    return width > 390;
  }, [width]);

  const getClassName = useCallback(() => {
    switch (true) {
      case width >= 800:
        return fluentStyle.sideNavButton;
      case isLargerThanDefaultPhone():
        return fluentStyle.bottomNavButton;
      default:
        return fluentStyle.smallRoundNavButton;
    }
  }, [width]);

  const BaseBarComponents = useCallback(() => {
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
                size={isLargerThanDefaultPhone() ? "medium" : "large"}
                title={t(item.label) ?? item.label}
              >
                {isLargerThanDefaultPhone() && <Text>{t(item.label)}</Text>}
              </Button>
            )}
          </NavLink>
        </li>
      );
    });

    return <ul>{baseBarComponents}</ul>;
  }, [width]);

  return <BaseBarComponents />;
}
