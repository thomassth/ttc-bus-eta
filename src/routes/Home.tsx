import { Button, Input } from "@fluentui/react-components";
import { ChangeEventHandler, useState } from "react";
import { useTranslation } from "react-i18next";

import Bookmark from "../features/bookmarks/bookmark";
import useNavigate from "./navigate";

export default function Home() {
  const [input, setInput] = useState("");
  const { t } = useTranslation();
  const { navigate } = useNavigate();

  const handleLineChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.currentTarget.value);
  };

  const handleSearchClick = () => {
    navigate("lines/" + input);
  };

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
