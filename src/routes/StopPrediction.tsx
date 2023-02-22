import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import EtaCardContainer from "../components/etaCard/EtaCardContainer";
import { stopsDataEndpoint } from "../constants/dataEndpoints";

export default function StopPrediction() {
  const params = useParams();
  const stopId = params.stopId ?? "";
  const [dataUrl, setDataUrl] = useState("");

  useEffect(() => {
    document.title = `Stop ID ${stopId} | TTC arrivals`;
    setDataUrl(stopsDataEndpoint.concat(stopId));
  });
  return (
    <main className="stopPredictionPage">
      <EtaCardContainer dataUrl={dataUrl} shdShowTitle stopId={stopId} />
    </main>
  );
}
