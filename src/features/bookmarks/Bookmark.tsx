import { Button, Text } from "@fluentui/react-components";
import { useCallback } from "react";
import { Trans, useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import RawDisplay from "../../components/RawDisplay";
import { BookmarkCard } from "./BookmarkCard";
import { clearStopBookmarks } from "./stopBookmarkSlice";

export default function Bookmark() {
  const stopBookmarks = useAppSelector((state) => state.stopBookmarks);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const bookmarks = stopBookmarks.ids.map((item: number) => {
    return <BookmarkCard key={item} id={item} />;
  });

  console.log(stopBookmarks.entities);

  const clearAllBookmarks = useCallback(() => {
    dispatch(clearStopBookmarks());
  }, []);

  return (
    <main>
      {stopBookmarks.ids.length === 0 ? (
        <section>
          <Trans>{t("home.headline")}</Trans>
          <Text>{t("home.bookmarkReminder")}</Text>
        </section>
      ) : null}
      <div className="bookmarks">{bookmarks}</div>
      {stopBookmarks.ids.length > 0 ? (
        <Button onClick={clearAllBookmarks}>{t("buttons.clear")}</Button>
      ) : null}

      <RawDisplay data={stopBookmarks} />
    </main>
  );
}
