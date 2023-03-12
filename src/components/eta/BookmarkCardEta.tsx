import { LineStopEta, stopBookmarksRedux } from "../../models/etaObjects";
import { useAppSelector } from "../../store";
import { EtaCard } from "../etaCard/EtaCard";

export function BookmarkCardEta(props: { item: LineStopEta }) {
  const stopBookmarks: stopBookmarksRedux = useAppSelector(
    (state) => state.stopBookmarks
  );

  let stopUrl = `/lines/${props.item.line}/${props.item.stopTag}`;

  for (const id of stopBookmarks.ids) {
    if (stopBookmarks.entities[id].ttcId === props.item.stopTag) {
      stopUrl = `/stops/${stopBookmarks.entities[id].stopId}`;
    }
  }

  return (
    <EtaCard
      etas={props.item.etas}
      lines={[props.item.etas[0].branch]}
      name={props.item.routeName}
      editable={false}
      onDelete={undefined}
      stopUrl={stopUrl}
    />
  );
}
