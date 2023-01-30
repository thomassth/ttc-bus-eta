import { Text } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import { useAppSelector } from "../../app/hooks";
import RawDisplay from "../../components/RawDisplay";
import { FetchXMLWithCancelToken } from "../../components/fetchUtils";
import { multiStopParser } from "../../components/parser/multiStopParser";
import { LineStopEta, stopBookmarkRedux } from "../../data/etaObjects";
import { EtaPredictionXml } from "../../data/etaXml";
import { BookmarkCardEta } from "./BookmarkCardEta";

export default function FavouriteEta() {
  const stopBookmarks: stopBookmarkRedux = useAppSelector(
    (state) => state.stopBookmarks
  );
  const { t } = useTranslation();
  const [data, setData] = useState<EtaPredictionXml>();
  const [etaDb, setEtaDb] = useState<LineStopEta[]>([]);
  const [lastUpdatedAt] = useState<number>(Date.now());

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
      setEtaDb(multiStopParser(parsedData));
    });

    // when useEffect is called, the following clean-up fn will run first
    return () => {
      controller.abort();
    };
  }, [lastUpdatedAt]);

  const EtaCards = [];
  for (const item of etaDb) {
    if (item.etas.length > 0) {
      const id = `${item.line}-${item.stopTag}`;
      EtaCards.push(<BookmarkCardEta item={item} key={id} />);
    }
  }

  return (
    <article className="bookmarkContainer">
      {stopBookmarks.ids.length === 0 ? (
        <section>
          <Trans>{t("home.headline")}</Trans>
          <Text>{t("home.bookmarkReminder")}</Text>
        </section>
      ) : null}
      <ul>{EtaCards}</ul>

      {data !== undefined && <RawDisplay data={data} />}
    </article>
  );
}
