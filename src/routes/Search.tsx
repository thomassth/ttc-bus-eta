import { Button, Input, Title1 } from "@fluentui/react-components";
import { ArrowRight12Filled } from "@fluentui/react-icons";
import { SetStateAction, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { stopBookmarksRedux } from "../models/etaObjects.js";
import { useAppSelector } from "../store/index.js";
import style from "./Search.module.css";
import useNavigate from "./navigate.js";

export default function SearchElement() {
  const [lineInput, setLineInput] = useState("");
  const [stopInput, setStopInput] = useState("");
  const { t } = useTranslation();
  const { navigate } = useNavigate();

  const stopBookmarks: stopBookmarksRedux = useAppSelector(
    (state: { stopBookmarks: stopBookmarksRedux }) => state.stopBookmarks
  );

  const bookmarksSaved = useMemo(() => {
    return stopBookmarks.ids.length > 0;
  }, [stopBookmarks.ids.length]);

  const handleLineChange = useCallback(
    (e: { currentTarget: { value: SetStateAction<string> } }) => {
      setLineInput(e.currentTarget.value);
    },
    []
  );

  const handleStopChange = useCallback(
    (e: { currentTarget: { value: SetStateAction<string> } }) => {
      setStopInput(e.currentTarget.value);
    },
    []
  );

  const handleSearchClick = useCallback(() => {
    if (stopInput !== "") {
      navigate(`stops/${stopInput}`);
    } else if (lineInput !== "") navigate(`lines/${lineInput}`);
  }, [lineInput, stopInput]);

  const classList = useMemo(() => {
    const list = [style["next-vehicle-container"]];

    if (bookmarksSaved) list.push(style.compact);

    return list;
  }, [bookmarksSaved]);

  return (
    <div className="search-form">
      <form className={classList.join(" ")}>
        <div className={style.title}>
          <Title1>{t("home.nextVehicle")}</Title1>
        </div>
        <Input
          className={style["center-input"]}
          size="large"
          appearance="underline"
          type="number"
          onChange={handleStopChange}
          value={stopInput}
          placeholder={t("stops.ariaLabel") ?? ""}
        />
        <div className={style["submit-button"]}>
          <Button
            type="submit"
            appearance="primary"
            icon={<ArrowRight12Filled />}
            onClick={handleSearchClick}
            className={style["subtle-search"]}
            disabled={stopInput.length < 1}
            title={t("buttons.search")}
          />
        </div>
      </form>
      <div className={style.separation}>
        <hr /> <span>{t("home.or")}</span> <hr />
      </div>
      <form className={style["search-block"]}>
        <Input
          disabled={stopInput.length > 0}
          value={lineInput}
          className={style["flex-grow"]}
          onChange={handleLineChange}
          aria-label={t("lines.ariaLabel") ?? ""}
          placeholder={t("lines.placeholder")}
        />
        <Button
          appearance="primary"
          disabled={lineInput.length < 1}
          type="submit"
          onClick={handleSearchClick}
        >
          {t("buttons.search")}
        </Button>
      </form>
    </div>
  );
}
