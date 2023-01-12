import { Button, Input } from "@fluentui/react-components";
import { SetStateAction, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import Bookmark from "../features/bookmarks/Bookmark";
import useNavigate from "./navigate";

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
    navigate(`lines/${input}`);
  }, [input]);

  return (
    <main>
      <form className="searchBlock">
        <Input
          value={input}
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
