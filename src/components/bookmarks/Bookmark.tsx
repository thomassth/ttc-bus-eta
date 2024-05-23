import { Button, Text } from "@fluentui/react-components";
import { useCallback, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import { LineStopEta, stopBookmarksRedux } from "../../models/etaObjects.js";
import { clearStopBookmarks } from "../../store/bookmarks/slice.js";
import { useAppDispatch, useAppSelector } from "../../store/index.js";
import { FetchXMLWithCancelToken } from "../fetch/fetchUtils.js";
import { multiStopParser } from "../parser/multiStopParser.js";
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
  const [, setData] = useState();
  const [etaDb, setEtaDb] = useState<LineStopEta[]>([]);
  const [lastUpdatedAt] = useState<number>(Date.now());

  let fetchUrl = "";

  for (const id of stopBookmarks.ids) {
    const ttcStop = stopBookmarks.entities[id].ttcId;

    for (const line of stopBookmarks.entities[id].lines) {
      fetchUrl = fetchUrl.concat(`&stops=${parseInt(line)}|${ttcStop}`);
    }
  }

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
        `https://webservices.umoiq.com/service/publicXMLFeed?command=predictionsForMultiStops&a=ttc${fetchUrl}`,
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
