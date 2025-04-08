import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { StopWithDistance } from "../../models/db.js";
import { EtaBusWithID } from "../../models/etaObjects.js";
import { EtaCard } from "../etaCard/EtaCard.js";
import { ttcStopPrediction } from "../fetch/queries.js";
import { etaParser } from "../parser/etaParser.js";

export default function NearbyStopCard({ stop }: { stop: StopWithDistance }) {
  const { t } = useTranslation();

  const getStopPredictionsResponse = useQuery({
    ...ttcStopPrediction(parseInt(stop.id)),
    queryKey: [`nearby-stop-${stop.id}`],
  });

  const unifiedEta = useMemo(() => {
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

  return (
    <EtaCard
      key={stop.id}
      direction={stop.directions}
      lines={stop.lines}
      name={`${stop.title}\n${stop.realDistance.toPrecision(4)}${t("nearby.mAway")}`}
      id={stop.id}
      stopUrl={`/stops/${stop.id}`}
      etas={unifiedEta}
      editable={false}
    />
  );
}
