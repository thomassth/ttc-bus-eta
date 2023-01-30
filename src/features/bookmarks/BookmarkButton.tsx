import { Button } from "@fluentui/react-components";
import { Bookmark24Filled, Bookmark24Regular } from "@fluentui/react-icons";
import { t } from "i18next";
import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { StopBookmark, stopBookmarkRedux } from "../../data/etaObjects";
import { addStopBookmark, removeStopBookmark } from "./stopBookmarkSlice";

export function BookmarkButton(props: StopBookmark) {
  const dispatch = useAppDispatch();
  const stopBookmarks: stopBookmarkRedux = useAppSelector(
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
      icon={isBookmarked() ? <Bookmark24Filled /> : <Bookmark24Regular />}
      onClick={checkBookmarkStatus}
    />
  );
}
