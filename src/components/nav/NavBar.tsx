import { Button, Text } from "@fluentui/react-components";
import {
  ArrowRouting20Regular,
  ArrowRouting24Filled,
  Home20Regular,
  Home24Filled,
  Question20Regular,
  Question24Filled,
} from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";

import { fluentStyles } from "../../styles/fluent";
import { LanguageSelection } from "./LanguageSelection";
import { NavItem, useNavBarRouteUtils } from "./navBarRouteUtils";

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
    icon: <Question20Regular />,
    iconActive: <Question24Filled />,
  },
];

export function BottomBar({ width }: { width: number }) {
  const { t } = useTranslation();
  const fluentStyle = fluentStyles();
  const { handleRouteClick, getFullRoute } = useNavBarRouteUtils();

  const BottomNavItems = navItems.map((item) => {
    if (getFullRoute(item) === window.location.pathname) {
      return (
        <Button
          className={fluentStyle.bottomNavButton}
          shape="circular"
          appearance="primary"
          key={t(item.label)}
          icon={item.iconActive}
          onClick={handleRouteClick(item.path)}
        >
          {width > 480 && <Text>{t(item.label)}</Text>}
        </Button>
      );
    } else {
      return (
        <Button
          className={fluentStyle.bottomNavButton}
          shape="circular"
          appearance="subtle"
          icon={item.icon}
          key={t(item.label)}
          onClick={handleRouteClick(item.path)}
        >
          {width > 480 && <Text>{t(item.label)}</Text>}
        </Button>
      );
    }
  });

  // add support for swithing lang

  return (
    <div className="bottomNav">
      {BottomNavItems}
      <LanguageSelection width={width} />
    </div>
  );
}

export function SideBar({ width }: { width: number }) {
  const { t } = useTranslation();
  const fluentStyle = fluentStyles();
  const { handleRouteClick, getFullRoute } = useNavBarRouteUtils();

  const BottomNavItems = navItems.map((item) => {
    if (getFullRoute(item) === window.location.pathname) {
      return (
        <Button
          className={fluentStyle.sideNavButton}
          shape="circular"
          appearance="primary"
          key={t(item.label)}
          icon={item.iconActive}
          onClick={handleRouteClick(item.path)}
        >
          <Text>{t(item.label)}</Text>
        </Button>
      );
    } else {
      return (
        <Button
          className={fluentStyle.sideNavButton}
          shape="circular"
          appearance="subtle"
          icon={item.icon}
          key={t(item.label)}
          onClick={handleRouteClick(item.path)}
        >
          <Text>{t(item.label)}</Text>
        </Button>
      );
    }
  });
  return (
    <nav className="sideNav">
      {BottomNavItems}
      <LanguageSelection width={width} />
    </nav>
  );
}
