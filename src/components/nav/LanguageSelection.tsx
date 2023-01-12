import {
  Button,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Radio,
  RadioGroup,
} from "@fluentui/react-components";
import { LocalLanguage20Regular } from "@fluentui/react-icons";
import { FormEvent, useCallback } from "react";
import { useTranslation } from "react-i18next";

export function LanguageSelection() {
  const { t, i18n } = useTranslation();
  const handleLangChange = useCallback(
    (_: FormEvent<HTMLDivElement>, data: { value: string | undefined }) => {
      i18n.changeLanguage(data.value);
    },
    []
  );
  return (
    <Popover>
      <PopoverTrigger disableButtonEnhancement>
        <Button
          shape="circular"
          appearance="outline"
          icon={<LocalLanguage20Regular />}
        />
      </PopoverTrigger>

      <PopoverSurface>
        <RadioGroup
          defaultValue={i18n.language}
          aria-labelledby={"language selection"}
          onChange={handleLangChange}
        >
          <Radio value="en" label={t("lang.en")} />
          <Radio value="fr" label={t("lang.fr")} />
          <Radio value="zh" label={t("lang.zh")} />
        </RadioGroup>
      </PopoverSurface>
    </Popover>
  );
}
