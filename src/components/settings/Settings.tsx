import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Switch,
  Title1,
  Title2,
} from "@fluentui/react-components";
import { FormEvent, SetStateAction, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { settingsRedux } from "../../models/etaObjects";
import useNavigate from "../../routes/navigate";
import { store, useAppDispatch, useAppSelector } from "../../store";
import { changeSettings, settingsSelectors } from "../../store/settings/slice";
import { fluentStyles } from "../../styles/fluent";
import RawDisplay from "../rawDisplay/RawDisplay";

export function Settings() {
  const settings: settingsRedux = useAppSelector((state) => state.settings);

  const devModeValue = settingsSelectors.selectById(
    store.getState().settings,
    "devMode"
  );
  const [devMode, setDevMode] = useState(
    typeof devModeValue !== "undefined" ? devModeValue.value === "true" : false
  );
  const unifiedEtaValue = settingsSelectors.selectById(
    store.getState().settings,
    "unifiedEta"
  );
  const [unifiedEta, setUnifiedEta] = useState(
    typeof unifiedEtaValue !== "undefined"
      ? unifiedEtaValue.value !== "false"
      : true
  );
  const { t, i18n } = useTranslation();
  const fluentStyle = fluentStyles();
  const dispatch = useAppDispatch();

  const handleLangChange = useCallback(
    (_: FormEvent<HTMLDivElement>, data: { value: string | undefined }) => {
      i18n.changeLanguage(data.value);
    },
    []
  );

  const handleUnifiedEtaChange = useCallback(
    (_: FormEvent<HTMLDivElement>, data: { value: string | undefined }) => {
      setUnifiedEta(data.value === "true");
      dispatch(
        changeSettings({
          id: "unifiedEta",
          name: "unifiedEta",
          value: (data.value === "true").toString(),
        })
      );
    },
    [setUnifiedEta]
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

  // Temp. search box
  const { navigate } = useNavigate();
  const [stopInput, setStopInput] = useState("");
  const handleStopChange = useCallback(
    (e: { currentTarget: { value: SetStateAction<string> } }) => {
      setStopInput(e.currentTarget.value);
    },
    []
  );
  const handleSearchClick = useCallback(() => {
    if (stopInput !== "")
      if (stopInput === "yrt") {
        navigate(`../yrt`);
      } else navigate(`../yrt/stops/${stopInput}`);
  }, [stopInput]);

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
      <Link to="/about" title={t("nav.label.about") ?? "About"}>
        <Button className={fluentStyle.navButtonLink}>
          {t("nav.label.about")}
        </Button>
      </Link>
      <Title2>ETA lists</Title2>
      <RadioGroup
        defaultValue={unifiedEta.toString()}
        aria-labelledby={"Unifed ETA mode"}
        onChange={handleUnifiedEtaChange}
      >
        <Radio value="false" label={"separate for each line"} />
        <Radio value="true" label={"single list"} />
      </RadioGroup>
      <form className="searchBlock">
        <Input
          value={stopInput}
          className={fluentStyle.flexGrowContent}
          onChange={handleStopChange}
        />
        <Button type="submit" onClick={handleSearchClick}>
          ???
        </Button>
      </form>
      <RawDisplay data={settings} />
    </main>
  );
}
