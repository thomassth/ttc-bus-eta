import { Button } from "@fluentui/react-components";
import {
  BookmarkAdd24Regular,
  BookmarkOff24Filled,
} from "@fluentui/react-icons";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { StopBookmark } from "../../models/etaObjects.js";
import { useSettingsStore } from "../../store/settingsStore.js";

export function BookmarkButton(props: StopBookmark) {
  const { t } = useTranslation();
  const stopBookmarks = useSettingsStore((state) => state.stopBookmarks);
  const stopBookmarksIds = useMemo(
    () => Array.from(stopBookmarks.keys()),
    [stopBookmarks]
  );
  const isBookmarked = useCallback(() => {
    return stopBookmarksIds.includes(props.stopId);
  }, [stopBookmarks]);

  const checkBookmarkStatus = useCallback(() => {
    if (isBookmarked()) {
      useSettingsStore.setState((prev) => {
        const updatedBookmarks = new Map(prev.stopBookmarks || []);
        updatedBookmarks.delete(props.stopId);
        return { stopBookmarks: updatedBookmarks };
      });
    } else {
      useSettingsStore.setState((prev) => ({
        stopBookmarks: new Map(prev.stopBookmarks || []).set(
          props.stopId,
          props
        ),
      }));
    }
  }, [stopBookmarksIds]);

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
