import { Button, Text } from "@fluentui/react-components";
import { useCallback } from "react";
import { Trans, useTranslation } from "react-i18next";

import RawDisplay from "../../components/RawDisplay";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { BookmarkCard } from "./BookmarkCard";
import { clearStopBookmarks } from "./stopBookmarkSlice";

export default function Bookmark() {
  const stopBookmarks = useAppSelector((state) => state.stopBookmarks);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const bookmarks = stopBookmarks.ids.map((item: number) => {
    return <BookmarkCard key={item} id={item} />;
  });

  const clearAllBookmarks = useCallback(() => {
    dispatch(clearStopBookmarks());
  }, []);

  return (
    <article className="bookmarkContainer">
      {stopBookmarks.ids.length === 0 ? (
        <section>
          <Trans>{t("home.headline")}</Trans>
          <Text>{t("home.bookmarkReminder")}</Text>
        </section>
      ) : null}
      <ul>{bookmarks}</ul>
      {stopBookmarks.ids.length > 0 ? (
        <Button className="bookmarkClearButton" onClick={clearAllBookmarks}>
          {t("buttons.clear")}
        </Button>
      ) : null}

      <RawDisplay data={stopBookmarks} />
    </article>
  );
}
