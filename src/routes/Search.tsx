import { Button, Input } from "@fluentui/react-components";
import { SetStateAction, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import style from "./Search.module.css";
import useNavigate from "./navigate.js";

export default function SearchElement() {
  const [lineInput, setLineInput] = useState("");
  const { t } = useTranslation();
  const { navigate } = useNavigate();

  const handleLineChange = useCallback(
    (e: { currentTarget: { value: SetStateAction<string> } }) => {
      setLineInput(e.currentTarget.value);
    },
    []
  );

  const handleSearchClick = useCallback(() => {
    if (lineInput !== "") navigate(`lines/${lineInput}`);
  }, [lineInput]);

  return (
    <div className="search-form">
      <form className={style["search-block"]}>
        <Input
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
