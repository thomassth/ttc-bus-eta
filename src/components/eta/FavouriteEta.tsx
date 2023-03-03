import { Button, Text } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import {
  LineStopEta,
  stopBookmarkWithEta,
  stopBookmarksRedux,
} from "../../models/etaObjects";
import { EtaPredictionXml } from "../../models/etaXml";
import { store, useAppSelector } from "../../store";
import { settingsSelectors } from "../../store/settings/slice";
import Bookmark from "../bookmarks/Bookmark";
import { FetchXMLWithCancelToken } from "../fetch/fetchUtils";
import { multiStopParser, multiStopUnifier } from "../parser/multiStopParser";
import RawDisplay from "../rawDisplay/RawDisplay";
import { BookmarkCardEta } from "./BookmarkCardEta";
import { BookmarkCardEtaUnified } from "./BookmarkCardEtaUnified";

export default function FavouriteEta() {
  const stopBookmarks: stopBookmarksRedux = useAppSelector(
    (state) => state.stopBookmarks
  );
  const { t } = useTranslation();
  const [data, setData] = useState<EtaPredictionXml>();
  const [singleEtaDb, setSingleEtaDb] = useState<LineStopEta[]>([]);
  const [unifiedEtaDb, setUnifiedEtaDb] = useState<stopBookmarkWithEta[]>([]);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<number>(0);
  const unifiedEtaValue =
    settingsSelectors.selectById(store.getState().settings, "unifiedEta")
      ?.value !== "false";

  let fetchUrl = "";

  for (const id of stopBookmarks.ids) {
    const ttcStop = stopBookmarks.entities[id].ttcId;

    for (const line of stopBookmarks.entities[id].lines) {
      fetchUrl = fetchUrl.concat(`&stops=${parseInt(line)}|${ttcStop}`);
    }
  }

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
    if (fetchUrl.length > 0) {
      fetchEtaData().then(({ parsedData, error }) => {
        if (error || !parsedData) {
          return;
        }
        setData(parsedData);
        setLastUpdatedAt(Date.now());
        if (unifiedEtaValue) {
          setUnifiedEtaDb(multiStopUnifier(parsedData, stopBookmarks));
        } else {
          setSingleEtaDb(multiStopParser(parsedData));
        }
      });
    }

    // when useEffect is called, the following clean-up fn will run first
    return () => {
      controller.abort();
    };
  }, []);

  const EtaCards = [];
  if (unifiedEtaValue) {
    for (const item of unifiedEtaDb) {
      if (item.etas.length > 0) {
        const id = `${item.stopId}`;
        EtaCards.push(<BookmarkCardEtaUnified item={item} key={id} />);
      }
    }
  } else {
    for (const item of singleEtaDb) {
      if (item.etas.length > 0) {
        const id = `${item.line}-${item.stopTag}`;
        EtaCards.push(<BookmarkCardEta item={item} key={id} />);
      }
    }
  }

  return (
    <article className="bookmarkContainer">
      {stopBookmarks.ids.length === 0 ? (
        <section className="itemInfoPlaceholder">
          <Trans>{t("home.headline")}</Trans>
          <Text>{t("home.bookmarkReminder")}</Text>
        </section>
      ) : EtaCards.length > 0 ? (
        <article>
          <ul>{EtaCards}</ul>
        </article>
      ) : lastUpdatedAt > 0 ? (
        <section>
          <p>{t("home.homeNoEta")}</p>
          <Bookmark />
        </section>
      ) : null}
      <Link to={"/bookmarks"}>
        <Button>{t("buttons.bookmarkEdit")}</Button>
      </Link>

      {data !== undefined && <RawDisplay data={data} />}
    </article>
  );
}
