import { Button, Input } from "@fluentui/react-components";
import { SetStateAction, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import Bookmark from "../features/bookmarks/Bookmark";
import { fluentStyles } from "../styles/fluent";
import useNavigate from "./functions/navigate";

export default function Home() {
  const [input, setInput] = useState("");
  const { t } = useTranslation();
  const { navigate } = useNavigate();

  const handleLineChange = useCallback(
    (e: { currentTarget: { value: SetStateAction<string> } }) => {
      setInput(e.currentTarget.value);
    },
    []
  );

  const handleSearchClick = useCallback(() => {
    if (input === "") return;

    navigate(`lines/${input}`);
  }, [input]);

  const fluentStyle = fluentStyles();

  return (
    <main className="homePage">
      <form className="searchBlock">
        <Input
          value={input}
          className={fluentStyle.flexGrowContent}
          onChange={handleLineChange}
          aria-label={t("lines.ariaLabel") || ""}
          placeholder={t("lines.placeholder") || ""}
        />
        <Button appearance="primary" type="submit" onClick={handleSearchClick}>
          {t("buttons.search")}
        </Button>
      </form>
      <Bookmark />
    </main>
  );
}
