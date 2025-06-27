import { ToggleButton } from "@fluentui/react-components";
import {
  BookmarkAdd24Regular,
  BookmarkOff24Filled,
} from "@fluentui/react-icons";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import type {
  StopBookmark,
  stopBookmarksRedux,
} from "../../models/etaObjects.js";
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
  const isBookmarked = useMemo(() => {
    return stopBookmarks.ids.includes(props.stopId);
  }, [stopBookmarks, props.stopId]);

  const checkBookmarkStatus = useCallback(() => {
    if (isBookmarked) {
      dispatch(removeStopBookmark(props.stopId));
    } else {
      dispatch(addStopBookmark(props));
    }
  }, [dispatch, isBookmarked, props]);

  return (
    <ToggleButton
      title={
        isBookmarked
          ? (t("buttons.bookmarkDelete") ?? "Remove bookmark")
          : (t("buttons.bookmarkAdd") ?? "Add to bookmark")
      }
      checked={isBookmarked}
      icon={isBookmarked ? <BookmarkOff24Filled /> : <BookmarkAdd24Regular />}
      onClick={checkBookmarkStatus}
    ></ToggleButton>
  );
}
