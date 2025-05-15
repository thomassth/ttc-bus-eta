import { Button, Input, Title1 } from "@fluentui/react-components";
import { ArrowRight12Filled } from "@fluentui/react-icons";
import { type SetStateAction, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import type { stopBookmarksRedux } from "../../models/etaObjects.js";
import useNavigate from "../../routes/navigate.js";
import { useAppSelector } from "../../store/index.js";
import style from "./StopSearch.module.css";

export default function StopSearch(props: { compact?: boolean }) {
  const { t } = useTranslation();
  const { navigate } = useNavigate();

  const stopBookmarks: stopBookmarksRedux = useAppSelector(
    (state: { stopBookmarks: stopBookmarksRedux }) => state.stopBookmarks
  );

  const bookmarksSaved = useMemo(() => {
    return stopBookmarks.ids.length > 0;
  }, [stopBookmarks.ids.length]);

  const [stopInput, setStopInput] = useState("");
  const handleStopChange = useCallback(
    (e: { currentTarget: { value: SetStateAction<string> } }) => {
      setStopInput(e.currentTarget.value);
    },
    []
  );

  const classList = useMemo(() => {
    const list = [style["next-vehicle-container"]];

    if (bookmarksSaved || props.compact) {
      list.push(style.compact);
    }

    return list;
  }, [bookmarksSaved, props.compact]);

  const handleSearchClick = useCallback(() => {
    if (stopInput !== "") {
      navigate(`stops/${stopInput}`);
    }
  }, [stopInput]);

  return (
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
  );
}
