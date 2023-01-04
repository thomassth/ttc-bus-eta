import { Text } from "@fluentui/react-components";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import StopPredictionInfo from "../components/FetchStop";

export default function StopPrediction() {
  const params = useParams();
  const stopNum = parseInt(`${params.stopId}`);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `Stop ID ${stopNum} | TTC arrivals`;
  });
  return (
    <main>
      <Text>{t("stops.stopId", { stopNum })}</Text>
      <StopPredictionInfo stopId={stopNum} />
    </main>
  );
}
