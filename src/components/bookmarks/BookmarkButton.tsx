import { Button } from "@fluentui/react-components";
import {
  BookmarkAdd24Regular,
  BookmarkOff24Filled,
} from "@fluentui/react-icons";
import { t } from "i18next";
import { useCallback } from "react";

import { StopBookmark, stopBookmarksRedux } from "../../models/etaObjects";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  addStopBookmark,
  removeStopBookmark,
} from "../../store/bookmarks/slice";

export function BookmarkButton(props: StopBookmark) {
  const dispatch = useAppDispatch();
  const stopBookmarks: stopBookmarksRedux = useAppSelector(
    (state) => state.stopBookmarks
  );
  const isBookmarked = useCallback(() => {
    return stopBookmarks.ids.includes(props.stopId);
  }, [stopBookmarks]);

  const checkBookmarkStatus = useCallback(() => {
    if (isBookmarked()) {
      dispatch(removeStopBookmark(props.stopId));
    } else {
      dispatch(addStopBookmark(props));
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
