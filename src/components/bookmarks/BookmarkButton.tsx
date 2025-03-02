import { Button } from "@fluentui/react-components";
import {
  BookmarkAdd24Regular,
  BookmarkOff24Filled,
} from "@fluentui/react-icons";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { StopBookmark, stopBookmarksRedux } from "../../models/etaObjects.js";
import {
  addStopBookmark,
  removeStopBookmark,
} from "../../store/bookmarks/slice.js";
import { useAppDispatch, useAppSelector } from "../../store/index.js";

export function BookmarkButton(props: StopBookmark) {
  const { t } = useTranslation();
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
          ? (t("buttons.bookmarkDelete") ?? "Remove bookmark")
          : (t("buttons.bookmarkAdd") ?? "Add to bookmark")
      }
      icon={isBookmarked() ? <BookmarkOff24Filled /> : <BookmarkAdd24Regular />}
      onClick={checkBookmarkStatus}
    />
  );
}
