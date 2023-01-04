import { Button, Input, Text } from "@fluentui/react-components";
import { ChangeEventHandler, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

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
      <Text>
        <Trans>{t("home.headline")}</Trans>
      </Text>
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
    </main>
  );
}
