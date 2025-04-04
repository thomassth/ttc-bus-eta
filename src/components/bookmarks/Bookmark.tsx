import { Button, Text } from "@fluentui/react-components";
import { useCallback, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";

import { useSettingsStore } from "../../store/settingsStore.js";
import RawDisplay from "../rawDisplay/RawDisplay.js";
import { BookmarkCard } from "./BookmarkCard.js";

export default function Bookmark() {
  const stopBookmarks = useSettingsStore((state) => state.stopBookmarks);
  const stopBookmarksIds = useMemo(
    () => Array.from(stopBookmarks.keys()),
    [stopBookmarks]
  );
  const { t } = useTranslation();
  const bookmarks = stopBookmarksIds.map((item: number) => {
    return <BookmarkCard key={item} id={item} />;
  });

  let fetchUrl = "";

  for (const id of stopBookmarksIds) {
    const ttcStop = stopBookmarks.get(id)?.ttcId;

    const lines = stopBookmarks.get(id)?.lines;
    if (lines)
      for (const line of lines) {
        fetchUrl = fetchUrl.concat(`&stops=${parseInt(line)}|${ttcStop}`);
      }
  }

  const clearAllBookmarks = useCallback(() => {
    useSettingsStore.setState(() => {
      return {
        stopBookmarks: new Map(),
      };
    });
  }, []);

  return (
    <article className="bookmark-container">
      {stopBookmarksIds.length === 0 ? (
        <section className="item-info-placeholder">
          <Trans>{t("home.headline")}</Trans>
          <Text>{t("home.bookmarkReminder")}</Text>
        </section>
      ) : null}
      <ul>{bookmarks}</ul>
      {stopBookmarksIds.length > 0 ? (
        <Button className="bookmark-clear-button" onClick={clearAllBookmarks}>
          {t("buttons.clear")}
        </Button>
      ) : null}

      <RawDisplay data={Array.from(stopBookmarks.values())} />
    </article>
  );
}

export function BookmarkPage() {
  return (
    <main>
      <Bookmark />
    </main>
  );
}
