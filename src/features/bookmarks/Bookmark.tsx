import { Button, Text } from "@fluentui/react-components";
import { useCallback, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import RawDisplay from "../../components/RawDisplay";
import { FetchXMLWithCancelToken } from "../../components/fetchUtils";
import { multiStopParser } from "../../components/parser/multiStopParser";
import { LineStopEta } from "../../data/etaObjects";
import { BookmarkCard } from "./BookmarkCard";
import { clearStopBookmarks } from "./stopBookmarkSlice";

export default function Bookmark() {
  const stopBookmarks = useAppSelector((state) => state.stopBookmarks);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const bookmarks = stopBookmarks.ids.map((item: number) => {
    return <BookmarkCard key={item} id={item} />;
  });
  const [, setData] = useState();
  const [etaDb, setEtaDb] = useState<LineStopEta[]>([]);
  const [lastUpdatedAt] = useState<number>(Date.now());

  // const handleRefreshClick = useCallback(() => {
  //   setLastUpdatedAt(Date.now());
  // }, [lastUpdatedAt]);
  // const bookmarks = stopBookmarks.ids.map((item: number) => {
  //   return <BookmarkCard key={item} id={item} />;
  // });

  const clearAllBookmarks = useCallback(() => {
    dispatch(clearStopBookmarks());
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchEtaData = async () => {
      const { parsedData, error } = await FetchXMLWithCancelToken(
        `https://webservices.umoiq.com/service/publicXMLFeed?command=predictionsForMultiStops&a=ttc&stops=39|14211&stops=36|623`,
        {
          signal: controller.signal,
          method: "GET",
        }
      );

      return { parsedData, error };
    };

    fetchEtaData().then(({ parsedData, error }) => {
      if (error || !parsedData) {
        return;
      }
      console.log(parsedData);
      setData(parsedData);
      setEtaDb(multiStopParser(parsedData));
      console.log(etaDb);
    });

    // when useEffect is called, the following clean-up fn will run first
    return () => {
      controller.abort();
    };
  }, [lastUpdatedAt]);

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
