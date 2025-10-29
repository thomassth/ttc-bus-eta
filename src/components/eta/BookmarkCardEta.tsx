import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import type { EtaBusWithID, LineStopEta } from "../../models/etaObjects.js";
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
        if (list.etas) {
          templist = templist.concat(list.etas);
        }
      }
      return templist.sort((a, b) => a.epochTime - b.epochTime);
    }
    return [];
  }, [getStopPredictionsResponse.data]);

  const filteredEta = useMemo(() => {
    if (Array.isArray(props.item.line)) {
      return unifiedEta.filter((eta) => props.item.line.includes(eta.branch));
    }
    return unifiedEta.filter((eta) => eta.branch === props.item.line);
  }, [props.item.line, unifiedEta]);

  let stopUrl =
    props.item.type === "ttc-subway"
      ? `/ttc/lines/${props.item.line[0]}/${props.item.stopTag}`
      : `/stops/${props.item.stopTag}`;

  if (props.item.type !== "ttc-subway") {
    for (const item of stopBookmarks) {
      if (item.ttcId === props.item.stopTag) {
        stopUrl = `/stops/${item.stopId}`;
      }
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

  const direction = useMemo(() => {
    if (!item.directions) {
      return item.direction;
    }
    return (
      item.directions.find((line) => line.line === props.item.line)
        ?.direction ?? item.direction
    );
  }, [item, props.item.line]);

  if (item.type !== "ttc-subway" && dataFetched && filteredEta.length === 0) {
    return null;
  }
  return (
    <EtaCard
      id={props.item.stopName + props.item.stopTag}
      etas={filteredEta}
      lines={
        Array.isArray(props.item.line) ? props.item.line : [props.item.line]
      }
      direction={direction}
      name={name}
      editable={false}
      onDelete={undefined}
      stopUrl={stopUrl}
    />
  );
}
