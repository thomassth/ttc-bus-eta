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

export function BottomBar() {
  const { t } = useTranslation();
  const fluentStyle = fluentStyles();
  const navItems = [
    {
      label: t("nav.label.home"),
      href: `${process.env.PUBLIC_URL}/`,
      icon: <Home20Regular />,
      icon_active: <Home24Filled />,
    },
    {
      label: t("nav.label.lines"),
      href: `${process.env.PUBLIC_URL}/lines`,
      icon: <ArrowRouting20Regular />,
      icon_active: <ArrowRouting24Filled />,
    },
    {
      label: t("nav.label.about"),
      href: `${process.env.PUBLIC_URL}/about`,
      icon: <Question20Regular />,
      icon_active: <Question24Filled />,
    },
  ];

  const BottomNavItems = navItems.map((item) => {
    if (item.href === window.location.pathname) {
      return (
        <Button
          shape="circular"
          appearance="primary"
          className={fluentStyle.bottomNavButton}
          key={item.label}
          icon={item.icon_active}
        >
          <Text>{item.label}</Text>
        </Button>
      );
    } else {
      return (
        <Link href={item.href} appearance="subtle" key={item.label}>
          <Button
            shape="circular"
            appearance="subtle"
            className={fluentStyle.bottomNavButton}
            icon={item.icon}
          >
            <Text>{item.label}</Text>
          </Button>
        </Link>
      );
    }
  });

  // add support for swithing lang

  return (
    <nav className="bottomNav">
      {BottomNavItems}
      <LanguageSelection />
    </nav>
  );
}
