import { Button, Input } from "@fluentui/react-components";
import { SetStateAction, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { fluentStyles } from "../styles/fluent";
// import { useParams } from "react-router-dom";
import useNavigate from "./navigate";

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
      console.log(stopInput);
      navigate(`stops/${stopInput}`);
    } else if (lineInput !== "") navigate(`lines/${lineInput}`);
  }, [lineInput, stopInput]);

  const fluentStyle = fluentStyles();
  return (
    <form className="searchForm">
      <div className="nextVehicleContainer">
        <h1>Next Vehicle</h1>
        <Input
          className={fluentStyle.centerInput}
          size="large"
          appearance="underline"
          type="number"
          onChange={handleStopChange}
          value={stopInput}
          placeholder={t("stops.ariaLabel") ?? ""}
        />
      </div>
      <p className="separation">
        <hr /> or <hr />
      </p>
      <div className="searchBlock">
        <Input
          disabled={stopInput.length > 0}
          value={lineInput}
          className={fluentStyle.flexGrowContent}
          onChange={handleLineChange}
          aria-label={t("lines.ariaLabel") ?? ""}
          placeholder={`${t("lines.placeholder")}`}
        />
        <Button appearance="primary" type="submit" onClick={handleSearchClick}>
          {t("buttons.search")}
        </Button>
      </div>
    </form>
  );
}