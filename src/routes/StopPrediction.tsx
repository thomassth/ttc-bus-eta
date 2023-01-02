import { useParams } from "react-router-dom";
import StopPredictionInfo from "../components/FetchStop";
import { Title2 } from "@fluentui/react-components";
import { useEffect } from "react";

export default function StopPrediction() {
  const params = useParams();
  const stopNum = parseInt(`${params.stopId}`);
  useEffect(() => {
    document.title = `Stop ID ${stopNum} | TTC arrivals`;
  });
  return (
    <main>
      <Title2>Stop ID {params.stopId} =</Title2>
      <StopPredictionInfo stopId={stopNum} />
    </main>
  );
}
