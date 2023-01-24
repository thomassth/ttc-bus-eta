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

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import RawDisplay from "../../components/RawDisplay";
import { fluentStyles } from "../../styles/fluent";
import { changeSettings, settingsItem } from "./settingsSlice";

export function Settings() {
  const settings: { id: number[]; entities: settingsItem[] } = useAppSelector(
    (state) => state.settings
  );
  const [devMode, setDevMode] = useState(settings.entities[0].value === "true");
  const { t, i18n } = useTranslation();
  const fluentStyle = fluentStyles();
  const dispatch = useAppDispatch();

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
      console.log(valueString);
      setDevMode(ev.currentTarget.checked);
      dispatch(
        changeSettings({
          id: 0,
          name: "devMode",
          value: valueString,
        })
      );
    },
    [setDevMode]
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
      <Switch checked={devMode} onChange={devModeChange} label="Dev mode" />
      <Link to="/about" title={t("nav.label.about") ?? "About"}>
        <Button className={fluentStyle.navButtonLink}>About</Button>
      </Link>
      <RawDisplay data={settings} />
    </main>
  );
}
