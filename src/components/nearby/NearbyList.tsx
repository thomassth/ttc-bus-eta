import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { StopWithDistance } from "../../models/db.js";
import { store } from "../../store/index.js";
import { subwayDbSelectors } from "../../store/suwbayDb/slice.js";
import { getStopsWithinRange } from "../../store/ttcStopsDb.js";
import RawDisplay from "../rawDisplay/RawDisplay.js";
import style from "./NearbyList.module.css";
import NearbyStopCard from "./NearbyStopCard.js";
import { distanceOfTwoCoordinates } from "./coordinate-utils.js";

export default function NearbyList(props: {
  coordinate: {
    lat?: number;
    lon?: number;
  };
}) {
  const { t } = useTranslation();

  const [stopsList, setStopsList] = useState<StopWithDistance[]>([]);

  const subwayStops = subwayDbSelectors.selectAll(store.getState().subwayDb);

  const subwayStopsDistance = useMemo(() => {
    if (!props.coordinate.lat || !props.coordinate.lon) return [];
    return subwayStops.map((stop) => {
      return {
        ...stop,
        type: "ttc-subway",
        title: stop.stop.name,
        realDistance: distanceOfTwoCoordinates(
          { lat: props.coordinate.lat ?? 0, lon: props.coordinate.lon ?? 0 },
          { lat: stop.stop.latitude, lon: stop.stop.longitude }
        ),
      };
    });
  }, [stopsList, props.coordinate]);

  const busAndSubwayStops = useMemo(() => {
    if (!stopsList.length) return stopsList;
    return subwayStopsDistance
      .filter((stop) => stop.realDistance < 500)
      .concat(stopsList)
      .sort((a, b) => a.realDistance - b.realDistance);
  }, [stopsList, subwayStopsDistance]);

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
    <>
      {props.coordinate.lat && props.coordinate.lon ? (
        <>
          <p>{t("nearby.closestStopsLead")}</p>
          <ul className={style["nearby-stops-list"]}>
            {busAndSubwayStops.map((stop) => (
              <NearbyStopCard key={stop.id} stop={stop} type={stop.type} />
            ))}
          </ul>
        </>
      ) : (
        <p>{t("nearby.locationNeeded")}</p>
      )}
      <RawDisplay data={busAndSubwayStops} />
    </>
  );
}
