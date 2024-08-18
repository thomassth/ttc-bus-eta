import { useEffect, useState } from "react";

import { getStopsWithinRange } from "../../store/ttcRouteDb.js";
import { EtaCard } from "../etaCard/EtaCard.js";
import style from "./nearby-list.module.css";

export default function NearbyList(props: {
  coordinate: {
    lat?: number;
    lon?: number;
  };
}) {
  const [stopsList, setStopsList] = useState<[]>([]);

  useEffect(() => {
    if (props.coordinate.lat && props.coordinate.lon)
      getStopsWithinRange(
        props.coordinate.lat,
        props.coordinate.lon,
        0.00325
      ).then((result) => {
        setStopsList(result);
      });
  }, [props.coordinate]);

  return (
    <div>
      {props.coordinate.lat && props.coordinate.lon ? (
        <>
          <p>The closest bus stops are:</p>
          <ul className={style["nearby-stops-list"]}>
            {stopsList.map((stop) => (
              <EtaCard
                key={stop.id}
                lines={stop.lines}
                name={stop.title}
                id={stop.id}
                stopUrl={`/stops/${stop.id}`}
                etas={[]}
                editable={false}
              />
            ))}
          </ul>
        </>
      ) : (
        <p>Nearby feature requires your location.</p>
      )}
    </div>
  );
}
