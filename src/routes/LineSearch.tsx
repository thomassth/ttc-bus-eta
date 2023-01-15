import { Button, Input, Text } from "@fluentui/react-components";
import { SetStateAction, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { fluentStyles } from "../styles/fluent";
import useNavigate from "./navigate";

export default function LineSearch() {
  const [input, setInput] = useState("");
  const { navigate } = useNavigate();
  const { t } = useTranslation();

  const handleLineChange = useCallback(
    (e: { currentTarget: { value: SetStateAction<string> } }) => {
      setInput(e.currentTarget.value);
    },
    []
  );

  const handleSearchClick = useCallback(() => {
    navigate(input);
  }, [input]);

  const fluentStyle = fluentStyles();

  return (
    <main>
      <form>
        <Text className="lineTitle">{t("lines.title")}</Text>
        <div className="searchBlock">
          <Input
            className={fluentStyle.flexGrowContent}
            value={input}
            onChange={handleLineChange}
          />
          <Button
            appearance="primary"
            onClick={handleSearchClick}
            type="submit"
          >
            {t("buttons.search")}
          </Button>
        </div>
      </form>
    </main>
  );
}
