import { Button, Input, Text } from "@fluentui/react-components";
import { ChangeEventHandler, useState } from "react";
import { useTranslation } from "react-i18next";

import useNavigate from "./navigate";

export default function LineSearch() {
  const [input, setInput] = useState("");
  const { navigate } = useNavigate();
  const { t } = useTranslation();

  const handleLineChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.currentTarget.value);
  };

  const handleSearchClick = () => {
    navigate(input);
  };

  return (
    <main>
      <form>
        <Text>{t("lines.title")}</Text>
        <div className="searchBlock">
          <Input value={input} onChange={handleLineChange} />
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
