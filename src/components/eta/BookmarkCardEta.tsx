import { useEffect, useState } from "react";

import { EtaBusWithID, LineStopEta } from "../../models/etaObjects.js";
import { store } from "../../store/index.js";
import { useSettingsStore } from "../../store/settingsStore.js";
import { subwayDbSelectors } from "../../store/suwbayDb/slice.js";
import { EtaCard } from "../etaCard/EtaCard.js";
import { getStopPredictions } from "../fetch/fetchUtils.js";
import { etaParser } from "../parser/etaParser.js";

export function BookmarkCardEta(props: { item: LineStopEta }) {
  const stopBookmarks = useSettingsStore((state) => state.stopBookmarks);

  const [unifiedEta, setUnifiedEta] = useState<EtaBusWithID[]>([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    getStopPredictions(props.item.stopTag, {
      signal: controller.signal,
    }).then((data) => {
      if (data) {
        setDataFetched(true);
        const etaDb = etaParser(data);

        let templist: EtaBusWithID[] = [];
        for (const list of etaDb) {
          if (list.etas) templist = templist.concat(list.etas);
        }
        setUnifiedEta(
          templist
            .filter(
              (eta) =>
                Array.isArray(props.item.line) || eta.branch === props.item.line
            )
            .sort((a, b) => a.epochTime - b.epochTime)
        );
      }
    });

    // when useEffect is called, the following clean-up fn will run first
    return () => {
      controller.abort();
    };
  }, []);
  let stopUrl =
    props.item.type === "ttc-subway"
      ? `/ttc/lines/${props.item.line[0]}/${props.item.stopTag}`
      : `/stops/${props.item.stopTag}`;

  if (props.item.type !== "ttc-subway")
    for (const item of stopBookmarks.values()) {
      if (item.ttcId === props.item.stopTag) {
        stopUrl = `/stops/${item.stopId}`;
      }
    }

  const item = props.item;

  const name =
    item.type === "ttc-subway" && props.item.stopTag
      ? (subwayDbSelectors.selectById(
          store.getState().subwayDb,
          props.item.stopTag
        )?.stop?.name ?? props.item.routeName)
      : props.item.stopName;

  if (item.type !== "ttc-subway" && dataFetched && unifiedEta.length === 0) {
    return null;
  }
  return (
    <EtaCard
      id={props.item.stopName + props.item.stopTag}
      etas={unifiedEta}
      lines={
        Array.isArray(props.item.line) ? props.item.line : [props.item.line]
      }
      direction={item.direction}
      name={name}
      editable={false}
      onDelete={undefined}
      stopUrl={stopUrl}
    />
  );
}
