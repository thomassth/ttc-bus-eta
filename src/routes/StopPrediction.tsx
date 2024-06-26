import { useEffect } from "react";
import { useParams } from "react-router-dom";

import StopPredictionInfo from "../components/fetch/FetchStop.js";

export default function StopPrediction() {
  const params = useParams();
  const stopNum = parseInt(`${params.stopId}`);

  useEffect(() => {
    document.title = `Stop ID ${stopNum} | TO bus`;
  });
  return (
    <main className="stop-prediction-page">
      <StopPredictionInfo stopId={stopNum} />
    </main>
  );
}
