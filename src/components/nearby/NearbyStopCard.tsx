import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { EtaBusWithID } from "../../models/etaObjects.js";
import { EtaCard } from "../etaCard/EtaCard.js";
import { getStopPredictions } from "../fetch/fetchUtils.js";
import { etaParser } from "../parser/etaParser.js";

export default function NearbyStopCard({
  stop,
}: {
  stop: {
    id: string;
    lines: string[];
    title: string;
    realDistance: number;
    directions: string;
  };
}) {
  const { t } = useTranslation();

  const [unifiedEta, setUnifiedEta] = useState<EtaBusWithID[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    getStopPredictions(parseInt(stop.id), { signal: controller.signal }).then(
      (data) => {
        if (data) {
          const etaDb = etaParser(data);

          let templist: EtaBusWithID[] = [];
          for (const list of etaDb) {
            templist = templist.concat(list.etas);
          }
          setUnifiedEta(templist.sort((a, b) => a.epochTime - b.epochTime));
        }
      }
    );

    // when useEffect is called, the following clean-up fn will run first
    return () => {
      controller.abort();
    };
  }, []);

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
