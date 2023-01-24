import {
  Button,
  Radio,
  RadioGroup,
  Title1,
  Title2,
} from "@fluentui/react-components";
import { FormEvent, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { fluentStyles } from "../../styles/fluent";

export function Settings() {
  const { t, i18n } = useTranslation();
  const fluentStyle = fluentStyles();

  const handleLangChange = useCallback(
    (_: FormEvent<HTMLDivElement>, data: { value: string | undefined }) => {
      i18n.changeLanguage(data.value);
    },
    []
  );

  return (
    <main className="settingsPage">
      <Title1>Settings</Title1>
      <Title2>{t("buttons.languageChange")}</Title2>
      <RadioGroup
        defaultValue={i18n.language}
        aria-labelledby={t("buttons.languageChange") ?? "Language selection"}
        onChange={handleLangChange}
      >
        <Radio value="en" label={t("lang.en")} />
        <Radio value="fr" label={t("lang.fr")} />
        <Radio value="zh" label={t("lang.zh")} />
      </RadioGroup>
      <Link to="/about" title={t("nav.label.about") ?? "About"}>
        <Button className={fluentStyle.navButtonLink}>About</Button>
      </Link>
    </main>
  );
}
