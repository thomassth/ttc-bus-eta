import { LineStopEta, stopBookmarksRedux } from "../../models/etaObjects.js";
import { useAppSelector } from "../../store/index.js";
import { EtaCard } from "../etaCard/EtaCard.js";

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

  const item = props.item;

  return (
    <EtaCard
      id={props.item.routeName + props.item.stopTag}
      etas={props.item.etas}
      lines={[
        props.item.type === "ttc-subway"
          ? props.item.line
          : props.item.etas[0]?.branch,
      ]}
      name={props.item.routeName}
      editable={false}
      onDelete={undefined}
      stopUrl={
        item.type === "ttc-subway"
          ? `/ttc/lines/${item.line}/${item.stopTag}`
          : stopUrl
      }
    />
  );
}
