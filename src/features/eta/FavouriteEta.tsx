import { Button, Text } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { store } from "../../app/store";
import RawDisplay from "../../components/RawDisplay";
import { FetchXMLWithCancelToken } from "../../components/fetchUtils";
import {
  multiStopParser,
  multiStopUnifier,
} from "../../components/parser/multiStopParser";
import {
  LineStopEta,
  stopBookmarkWithEta,
  stopBookmarksRedux,
} from "../../data/etaObjects";
import { EtaPredictionXml } from "../../data/etaXml";
import Bookmark from "../bookmarks/Bookmark";
import { settingsSelectors } from "../settings/settingsSlice";
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
  const [lastUpdatedAt] = useState<number>(Date.now());
  const unifiedEtaValue =
    settingsSelectors.selectById(store.getState().settings, "unifiedEta")
      ?.value === "true";

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

    fetchEtaData().then(({ parsedData, error }) => {
      if (error || !parsedData) {
        return;
      }
      setData(parsedData);
      if (unifiedEtaValue) {
        setUnifiedEtaDb(multiStopUnifier(parsedData, stopBookmarks));
      } else {
        setSingleEtaDb(multiStopParser(parsedData));
      }
    });

    // when useEffect is called, the following clean-up fn will run first
    return () => {
      controller.abort();
    };
  }, [lastUpdatedAt]);

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
        <section>
          <Trans>{t("home.headline")}</Trans>
          <Text>{t("home.bookmarkReminder")}</Text>
        </section>
      ) : EtaCards.length > 0 ? (
        <ul>{EtaCards}</ul>
      ) : (
        <section>
          <p>{t("home.homeNoEta")}</p>
          <Bookmark />
        </section>
      ) : null}
      <Link to={"/bookmarks"}>
        <Button>edit bookmarks</Button>
      </Link>

      {data !== undefined && <RawDisplay data={data} />}
    </article>
  );
}
