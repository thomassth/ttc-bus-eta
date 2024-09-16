import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { StopWithDistance } from "../../models/db.js";
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
  const { t } = useTranslation();

  const [stopsList, setStopsList] = useState<StopWithDistance[]>([]);

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
          <p>{t("nearby.closestStopsLead")}</p>
          <ul className={style["nearby-stops-list"]}>
            {stopsList.map((stop) => (
              <NearbyStopCard key={stop.id} stop={stop} />
            ))}
          </ul>
        </>
      ) : (
        <p>{t("nearby.locationNeeded")}</p>
      )}
      <RawDisplay data={stopsList} />
    </div>
  );
}
