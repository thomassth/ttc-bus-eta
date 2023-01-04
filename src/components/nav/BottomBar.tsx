import { Anchor, Nav as BottomNav } from "grommet";
import { ChangeEventHandler } from "react";
import { useTranslation } from "react-i18next";

export const BottomBar = () => {
  const { t, i18n } = useTranslation();

  const nav: JSX.Element[] = [];
  const navItems = [
    {
      label: t("nav.label.home"),
      href: `${process.env.PUBLIC_URL}/`,
    },
    {
      label: t("nav.label.lines"),
      href: `${process.env.PUBLIC_URL}/lines`,
    },
    {
      label: t("nav.label.about"),
      href: `${process.env.PUBLIC_URL}/about`,
    },
  ];

  const handleLangChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  navItems.forEach((item, index) => {
    if (item.href === window.location.pathname) {
      nav.push(
        <Anchor
          key={index}
          href={item.href}
          label={item.label}
          className="active"
        />
      );
    } else {
      nav.push(<Anchor key={index} label={item.label} href={item.href} />);
    }
  });

  // add support for swithing lang

  return (
    <BottomNav className="bottomNav" gap="medium" direction="row">
      {nav}
      <select
        defaultValue={i18n.language}
        className="langSelect"
        onChange={handleLangChange}
      >
        <option value="en">{t("lang.en")}</option>
        <option value="fr">{t("lang.fr")}</option>
      </select>
    </BottomNav>
  );
};
