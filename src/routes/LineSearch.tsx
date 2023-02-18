import { Title1 } from "@fluentui/react-components";
import { useTranslation } from "react-i18next";

import { RoutesInfo } from "../components/fetch/FetchRouteList";

export default function LineSearch() {
  const { t } = useTranslation();

  return (
    <main className="linePage">
      <Title1>{t("nav.label.lines")}</Title1>
      <RoutesInfo />
    </main>
  );
}
