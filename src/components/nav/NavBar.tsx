import { Button, Link, Text } from "@fluentui/react-components";
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

const navItems = [
  {
    label: "nav.label.home",
    href: `${process.env.PUBLIC_URL}/`,
    icon: <Home20Regular />,
    icon_active: <Home24Filled />,
  },
  {
    label: "nav.label.lines",
    href: `${process.env.PUBLIC_URL}/lines`,
    icon: <ArrowRouting20Regular />,
    icon_active: <ArrowRouting24Filled />,
  },
  {
    label: "nav.label.about",
    href: `${process.env.PUBLIC_URL}/about`,
    icon: <Question20Regular />,
    icon_active: <Question24Filled />,
  },
];

export function BottomBar({ width }: { width: number }) {
  const { t } = useTranslation();
  const fluentStyle = fluentStyles();

  const BottomNavItems = navItems.map((item) => {
    if (item.href === window.location.pathname) {
      return (
        <Button
          className={`bottomNavBarItems ${fluentStyle.bottomNavButton}`}
          shape="circular"
          appearance="primary"
          key={t(item.label)}
          icon={item.icon_active}
          size="large"
        >
          {width > 480 && <Text>{t(item.label)}</Text>}
        </Button>
      );
    } else {
      return (
        <Link href={item.href} appearance="subtle" key={t(item.label)}>
          <Button
            className={`bottomNavBarItems ${fluentStyle.bottomNavButton}`}
            shape="circular"
            appearance="subtle"
            icon={item.icon}
          >
            {width > 480 && <Text>{t(item.label)}</Text>}
          </Button>
        </Link>
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

  const BottomNavItems = navItems.map((item) => {
    if (item.href === window.location.pathname) {
      return (
        <Button
          className={fluentStyle.sideNavButton}
          shape="circular"
          appearance="primary"
          key={t(item.label)}
          icon={item.icon_active}
        >
          <Text>{t(item.label)}</Text>
        </Button>
      );
    } else {
      return (
        <Link
          href={item.href}
          className={fluentStyle.fullWidthContent}
          appearance="subtle"
          key={t(item.label)}
        >
          <Button
            className={fluentStyle.sideNavButton}
            shape="circular"
            appearance="subtle"
            icon={item.icon}
          >
            <Text>{t(item.label)}</Text>
          </Button>
        </Link>
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
