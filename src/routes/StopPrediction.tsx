import { useEffect } from "react";
import { useParams } from "react-router-dom";

import StopPredictionInfo from "../components/fetch/FetchStop";

export default function StopPrediction() {
  const params = useParams();
  const stopNum = parseInt(`${params.stopId}`);

  useEffect(() => {
    document.title = `Stop ID ${stopNum} | TTC arrivals`;
  });
  return (
    <main className="stopPredictionPage">
      <StopPredictionInfo stopId={stopNum} />
    </main>
  );
}
