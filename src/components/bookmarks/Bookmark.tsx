import { Button, Text } from "@fluentui/react-components";
import { useCallback } from "react";
import { Trans, useTranslation } from "react-i18next";

import type { stopBookmarksRedux } from "../../models/etaObjects.js";
import { clearStopBookmarks } from "../../store/bookmarks/slice.js";
import { useAppDispatch, useAppSelector } from "../../store/index.js";
import RawDisplay from "../rawDisplay/RawDisplay.js";
import { BookmarkCard } from "./BookmarkCard.js";

export default function Bookmark() {
  const stopBookmarks: stopBookmarksRedux = useAppSelector(
    (state: { stopBookmarks: stopBookmarksRedux }) => state.stopBookmarks
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const bookmarks = stopBookmarks.ids.map((item: number) => {
    return <BookmarkCard key={item} id={item} />;
  });

  let fetchUrl = "";

  for (const id of stopBookmarks.ids) {
    const ttcStop = stopBookmarks.entities[id].ttcId;

    for (const line of stopBookmarks.entities[id].lines) {
      fetchUrl = fetchUrl.concat(`&stops=${Number.parseInt(line)}|${ttcStop}`);
    }
  }

  const clearAllBookmarks = useCallback(() => {
    dispatch(clearStopBookmarks());
  }, []);

  return (
    <article className="bookmark-container">
      {stopBookmarks.ids.length === 0 ? (
        <section className="item-info-placeholder">
          <Trans>{t("home.headline")}</Trans>
          <Text>{t("home.bookmarkReminder")}</Text>
        </section>
      ) : null}
      <ul>{bookmarks}</ul>
      {stopBookmarks.ids.length > 0 ? (
        <Button className="bookmark-clear-button" onClick={clearAllBookmarks}>
          {t("buttons.clear")}
        </Button>
      ) : null}

      <RawDisplay data={stopBookmarks} />
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
