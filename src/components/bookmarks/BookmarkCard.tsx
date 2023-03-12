import { useCallback } from "react";

import { stopBookmarksRedux } from "../../models/etaObjects";
import { useAppDispatch, useAppSelector } from "../../store";
import { removeStopBookmark } from "../../store/bookmarks/slice";
import { EtaCard } from "../etaCard/EtaCard";

export function BookmarkCard(props: { id: number }) {
  const id = props.id;
  const dispatch = useAppDispatch();
  const stopBookmarks: stopBookmarksRedux = useAppSelector(
    (state) => state.stopBookmarks
  );

  const checkBookmarkStatus = useCallback(() => {
    dispatch(removeStopBookmark(props.id));
  }, [stopBookmarks.ids]);

  return (
    <EtaCard
      etas={[]}
      lines={stopBookmarks.entities[id].lines}
      name={stopBookmarks.entities[id].name}
      editable={true}
      onDelete={checkBookmarkStatus}
      stopUrl={`/stops/${stopBookmarks.entities[id].stopId}`}
    />
  );
}
