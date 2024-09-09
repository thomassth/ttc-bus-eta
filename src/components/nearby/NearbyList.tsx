import { useEffect, useState } from "react";

import { getStopsWithinRange } from "../../store/ttcRouteDb.js";
import RawDisplay from "../rawDisplay/RawDisplay.js";
import style from "./NearbyList.module.css";
import NearbyStopCard from "./NearbyStopCard.js";

export default function NearbyList(props: {
  coordinate: {
    lat?: number;
    lon?: number;
  };
}) {
  const [stopsList, setStopsList] = useState<
    {
      id: string;
      lines: string[];
      title: string;
      realDistance: number;
      directions: string;
    }[]
  >([]);

  useEffect(() => {
    if (props.coordinate.lat && props.coordinate.lon)
      getStopsWithinRange(
        props.coordinate.lat,
        props.coordinate.lon,
        0.00475
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
              <NearbyStopCard key={stop.id} stop={stop} />
            ))}
          </ul>
        </>
      ) : (
        <p>Nearby feature requires your location.</p>
      )}
      <RawDisplay data={stopsList} />
    </div>
  );
}
