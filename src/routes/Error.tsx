import { Text } from "@fluentui/react-components";
import { useTranslation } from "react-i18next";

export default function Error() {
  const { t } = useTranslation();

  return (
    <main>
      <Text>{t("error.notFound")}</Text>
    </main>
  );
}
