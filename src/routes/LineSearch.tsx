import { Button, Input, Text } from "@fluentui/react-components";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import useNavigate from "./navigate";

export default function LineSearch() {
  const [input, setInput] = useState("");
  const { navigate } = useNavigate();
  const { t } = useTranslation();

  const handleSearchClick = (input: string) => {
    navigate(input);
  };

  return (
    <main>
      <form>
        <Text>{t("lines.title")}</Text>
        <div className="searchBlock">
          <Input
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
          />
          <Button
            appearance="primary"
            onClick={() => handleSearchClick(input)}
            type="submit"
          >
            {t("buttons.search")}
          </Button>
        </div>
      </form>
    </main>
  );
}
