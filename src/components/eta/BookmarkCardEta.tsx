import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { EtaBusWithID, LineStopEta } from "../../models/etaObjects.js";
import { stopBookmarksSelectors } from "../../store/bookmarks/slice.js";
import { store } from "../../store/index.js";
import { subwayDbSelectors } from "../../store/suwbayDb/slice.js";
import { EtaCard } from "../etaCard/EtaCard.js";
import { ttcStopPrediction } from "../fetch/queries.js";
import { etaParser } from "../parser/etaParser.js";

export function BookmarkCardEta(props: { item: LineStopEta }) {
  const stopBookmarks = stopBookmarksSelectors.selectAll(
    store.getState().stopBookmarks
  );

  const getStopPredictionsResponse = useQuery({
    ...ttcStopPrediction(props.item.stopTag),
    queryKey: [`nearby-stop-${props.item.stopTag}`],
  });

  const dataFetched = useMemo(
    () => getStopPredictionsResponse.isSuccess,
    [getStopPredictionsResponse.isSuccess]
  );

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

  let stopUrl =
    props.item.type === "ttc-subway"
      ? `/ttc/lines/${props.item.line[0]}/${props.item.stopTag}`
      : `/stops/${props.item.stopTag}`;

  if (props.item.type !== "ttc-subway")
    for (const item of stopBookmarks) {
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
