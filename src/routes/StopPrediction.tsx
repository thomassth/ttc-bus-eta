import { useEffect } from "react";
import { useParams } from "react-router";

import StopPredictionInfo from "../components/fetch/StopPredictionInfo.js";

export default function StopPrediction() {
  const params = useParams();
  const stopNum = Number.parseInt(`${params.stopId}`);

  useEffect(() => {
    document.title = `Stop ID ${stopNum} | TO bus`;
  });
  return (
    <main className="stop-prediction-page">
      <StopPredictionInfo stopId={stopNum} />
    </main>
  );
}
