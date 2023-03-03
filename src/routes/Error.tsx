import { Text } from "@fluentui/react-components";
import { useTranslation } from "react-i18next";

export default function Error() {
  const { t } = useTranslation();

  return (
    <div>
      <Text>{t("error.notFound")}</Text>
    </div>
  );
}
