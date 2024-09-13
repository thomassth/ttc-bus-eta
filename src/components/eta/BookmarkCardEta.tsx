import { LineStopEta } from "../../models/etaObjects.js";
import { stopBookmarksSelectors } from "../../store/bookmarks/slice.js";
import { store } from "../../store/index.js";
import { subwayDbSelectors } from "../../store/suwbayDb/slice.js";
import { EtaCard } from "../etaCard/EtaCard.js";

export function BookmarkCardEta(props: { item: LineStopEta }) {
  const stopBookmarks = stopBookmarksSelectors.selectAll(
    store.getState().stopBookmarks
  );

  let stopUrl = `/lines/${props.item.line}/${props.item.stopTag}`;

  if (Array.isArray(props.item.line)) {
    stopUrl = `/stops/${props.item.stopTag}`;
  }

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
      : Array.isArray(props.item.line)
        ? props.item.stopName
        : `${props.item.routeName}
${props.item.stopName}`;

  return (
    <EtaCard
      id={props.item.stopName + props.item.stopTag}
      etas={props.item.etas}
      lines={
        Array.isArray(props.item.line)
          ? props.item.line
          : [
              props.item.type === "ttc-subway"
                ? props.item.line
                : props.item.etas[0]?.branch,
            ]
      }
      direction={item.direction}
      name={name}
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
