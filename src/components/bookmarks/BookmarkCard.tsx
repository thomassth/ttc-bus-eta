import { useCallback } from "react";

import { stopBookmarksRedux } from "../../models/etaObjects.js";
import { removeStopBookmark } from "../../store/bookmarks/slice.js";
import { useAppDispatch, useAppSelector } from "../../store/index.js";
import { EtaCard } from "../etaCard/EtaCard.js";

export function BookmarkCard(props: { id: number }) {
  const id = props.id;
  const dispatch = useAppDispatch();
  const stopBookmarks: stopBookmarksRedux = useAppSelector(
    (state: { stopBookmarks: stopBookmarksRedux }) => state.stopBookmarks
  );

  const checkBookmarkStatus = useCallback(() => {
    dispatch(removeStopBookmark(props.id));
  }, [stopBookmarks.ids]);

  const item = stopBookmarks.entities[id];
  return (
    <EtaCard
      enabled={item.enabled}
      id={id.toString()}
      etas={[]}
      lines={item.lines}
      name={item.name}
      editable
      onDelete={checkBookmarkStatus}
      stopUrl={
        item.type === "ttc-subway"
          ? `/ttc/lines/${item.lines[0]}/${item.stopId}`
          : `/stops/${item.stopId}`
      }
    />
  );
}
