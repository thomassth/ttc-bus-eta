import {
  Button,
  Radio,
  RadioGroup,
  Switch,
  Title1,
  Title2,
} from "@fluentui/react-components";
import { FormEvent, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { settingsRedux } from "../../models/settings";
import { store, useAppDispatch, useAppSelector } from "../../store";
import { changeSettings, settingsSelectors } from "../../store/settings/slice";
import { fluentStyles } from "../../styles/fluent";
import RawDisplay from "../rawDisplay/RawDisplay";

export function Settings() {
  const { t, i18n } = useTranslation();
  const fluentStyle = fluentStyles();
  const dispatch = useAppDispatch();
  const settings: settingsRedux = useAppSelector((state) => state.settings);

  const devModeValue = settingsSelectors.selectById(
    store.getState().settings,
    "devMode"
  );
  const [devMode, setDevMode] = useState(
    typeof devModeValue !== "undefined" ? devModeValue.value === "true" : false
  );

  const handleLangChange = useCallback(
    (_: FormEvent<HTMLDivElement>, data: { value: string | undefined }) => {
      i18n.changeLanguage(data.value);
    },
    []
  );

  const devModeChange = useCallback(
    (ev: {
      currentTarget: { checked: boolean | ((prevState: boolean) => boolean) };
    }) => {
      const valueString = ev.currentTarget.checked.toString();
      setDevMode(ev.currentTarget.checked);
      dispatch(
        changeSettings({
          id: "devMode",
          name: "devMode",
          value: valueString,
        })
      );
    },
    [setDevMode]
  );

  return (
    <main className="settingsPage">
      <Title1>{t("nav.label.settings")}</Title1>
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
      <Switch checked={devMode} onChange={devModeChange} label="Dev mode" />
      <Link to="/about" title={t("nav.label.about") ?? ""}>
        <Button className={fluentStyle.navButtonLink}>
          {t("nav.label.about")}
        </Button>
      </Link>
      <RawDisplay data={settings} />
    </main>
  );
}
