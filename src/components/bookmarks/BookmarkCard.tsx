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

  return (
    <EtaCard
      enabled={stopBookmarks.entities[id].enabled}
      id={id.toString()}
      etas={[]}
      lines={stopBookmarks.entities[id].lines}
      name={stopBookmarks.entities[id].name}
      editable
      onDelete={checkBookmarkStatus}
      stopUrl={`/stops/${stopBookmarks.entities[id].stopId}`}
    />
  );
}
