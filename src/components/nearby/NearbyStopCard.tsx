import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { StopWithDistance } from "../../models/db.js";
import { EtaBusWithID } from "../../models/etaObjects.js";
import { EtaCard } from "../etaCard/EtaCard.js";
import { ttcStopPrediction, ttcSubwayPredictions } from "../fetch/queries.js";
import { etaParser } from "../parser/etaParser.js";

export default function NearbyStopCard({ stop }: { stop: StopWithDistance }) {
  const { t } = useTranslation();

  const getStopPredictionsResponse =
    stop.type === "ttc-subway"
      ? useQuery({
          ...ttcSubwayPredictions(parseInt(stop.id)),
          queryKey: [`ttc-subway-stop-${stop.id}`],
        })
      : useQuery({
          ...ttcStopPrediction(parseInt(stop.id)),
          queryKey: [`nearby-stop-${stop.id}`],
        });

  const unifiedEta = useMemo(() => {
    if (stop.type === "ttc-subway") return [];
    if (getStopPredictionsResponse.data) {
      const etaDb = etaParser(getStopPredictionsResponse.data);

      let templist: EtaBusWithID[] = [];
      for (const list of etaDb) {
        if (list.etas) templist = templist.concat(list.etas);
      }
      return templist.sort((a, b) => a.epochTime - b.epochTime);
    } else {
      return [];
    }
  }, [getStopPredictionsResponse.data]);

  const lines = useMemo(() => {
    if (stop.type === "ttc-subway") {
      if (getStopPredictionsResponse.data)
        return [getStopPredictionsResponse.data?.[0].line];
      return [];
    }
    return stop.lines;
  }, [stop]);

  const url = useMemo(() => {
    if (stop.type === "ttc-subway") {
      return `/ttc/lines/${lines[0]}/${stop.id}`;
    } else {
      return `/stops/${stop.id}`;
    }
  }, [stop, lines]);

  const direction = useMemo(() => {
    if (stop.type === "ttc-subway") {
      return undefined;
    }
    return stop.directions;
  }, [stop, getStopPredictionsResponse.data]);

  return (
    <EtaCard
      key={stop.id}
      direction={direction}
      lines={lines}
      name={`${stop.title}\n${stop.realDistance.toPrecision(4)}${t("nearby.mAway")}`}
      id={stop.id}
      stopUrl={url}
      etas={unifiedEta}
      editable={false}
    />
  );
}
