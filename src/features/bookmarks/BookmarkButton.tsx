import { Button } from "@fluentui/react-components";
import {
  BookmarkAdd24Regular,
  BookmarkOff24Filled,
} from "@fluentui/react-icons";
import { t } from "i18next";
import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { db } from "../../data/db";
import { StopBookmark, stopBookmarksRedux } from "../../data/etaObjects";
import { addStopBookmark, removeStopBookmark } from "./stopBookmarkSlice";

export function BookmarkButton(props: StopBookmark) {
  const dispatch = useAppDispatch();
  const stopBookmarks: stopBookmarksRedux = useAppSelector(
    (state) => state.stopBookmarks
  );
  const isBookmarked = useCallback(() => {
    return stopBookmarks.ids.includes(props.stopId);
  }, [stopBookmarks]);

  const checkBookmarkStatus = useCallback(async () => {
    if (isBookmarked()) {
      dispatch(removeStopBookmark(props.stopId));
      await db.stops.delete(props.stopId);
    } else {
      dispatch(addStopBookmark(props));
      await db.stops.add(props);
    }
  }, [stopBookmarks.ids]);

  return (
    <Button
      title={
        isBookmarked()
          ? t("buttons.bookmarkDelete") ?? "Remove bookmark"
          : t("buttons.bookmarkAdd") ?? "Add to bookmark"
      }
      icon={isBookmarked() ? <BookmarkOff24Filled /> : <BookmarkAdd24Regular />}
      onClick={checkBookmarkStatus}
    />
  );
}
