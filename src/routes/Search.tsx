import { Button, Input, Title1 } from "@fluentui/react-components";
import { SetStateAction, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import style from "./Search.module.css";
import useNavigate from "./navigate.js";

export default function NewVehicle() {
  const [lineInput, setLineInput] = useState("");
  const [stopInput, setStopInput] = useState("");
  const { t } = useTranslation();
  const { navigate } = useNavigate();

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

  return (
    <form className="search-form">
      <div className={style["next-vehicle-container"]}>
        <Title1 className={style.title}>Next Vehicle</Title1>
        <Input
          className={style["center-input"]}
          size="large"
          appearance="underline"
          type="number"
          onChange={handleStopChange}
          value={stopInput}
          placeholder={t("stops.ariaLabel") ?? ""}
        />
      </div>
      <div className={style.separation}>
        <hr /> <span>or</span> <hr />
      </div>
      <div className={style["search-block"]}>
        <Input
          disabled={stopInput.length > 0}
          value={lineInput}
          className={style["flex-grow"]}
          onChange={handleLineChange}
          aria-label={t("lines.ariaLabel") ?? ""}
          placeholder={t("lines.placeholder")}
        />
        <Button appearance="primary" type="submit" onClick={handleSearchClick}>
          {t("buttons.search")}
        </Button>
      </div>
    </form>
  );
}
