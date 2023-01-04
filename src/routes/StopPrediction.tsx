import { Title2 } from "@fluentui/react-components";
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
      <Title2>{t("stops.stopId", { stopNum })}</Title2>
      <StopPredictionInfo stopId={stopNum} />
    </main>
  );
}
