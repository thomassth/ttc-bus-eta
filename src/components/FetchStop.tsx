import { Button, Text, Title1 } from "@fluentui/react-components";
import { ArrowClockwise24Regular } from "@fluentui/react-icons";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { LineStopEta } from "../data/etaObjects";
import { EtaPredictionXml } from "../data/etaXml";
import { BookmarkButton } from "../features/bookmarks/BookmarkButton";
import { fluentStyles } from "../styles/fluent";
import RawDisplay from "./RawDisplay";
import CountdownGroup from "./countdown/CountdownGroup";
import { FetchXMLWithCancelToken } from "./fetchUtils";
import { etaParser } from "./parser/etaParser";

function StopPredictionInfo(props: { stopId: number }): JSX.Element {
  const [data, setData] = useState<EtaPredictionXml>();
  const [stopId] = useState(props.stopId);
  const [etaDb, setEtaDb] = useState<LineStopEta[]>([]);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<number>(Date.now());
  const { t } = useTranslation();
  const fluentStyle = fluentStyles();

  const handleRefreshClick = useCallback(() => {
    setLastUpdatedAt(Date.now());
    setData(undefined);
    setEtaDb([]);
  }, [lastUpdatedAt]);

  function RefreshButton() {
    return (
      <Button
        className={fluentStyle.refreshButton}
        onClick={handleRefreshClick}
        icon={<ArrowClockwise24Regular />}
      >
        {t("buttons.refresh")}
      </Button>
    );
  }

  useEffect(() => {
    const controller = new AbortController();

    const fetchEtaData = async () => {
      const { parsedData, error } = await FetchXMLWithCancelToken(
        `https://webservices.umoiq.com/service/publicXMLFeed?command=predictions&a=ttc&stopId=${stopId}`,
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
      setEtaDb(etaParser(parsedData));
    });

    // when useEffect is called, the following clean-up fn will run first
    return () => {
      controller.abort();
    };
  }, [lastUpdatedAt]);

  if (data) {
    if (data.body.Error === undefined) {
      const countdownGroupList: JSX.Element[] = [];

      for (const element of etaDb) {
        if (element.etas.length > 0) {
          countdownGroupList.push(
            <CountdownGroup
              key={`${element.line}-${element.stopTag}`}
              detail={element}
            />
          );
        }
      }

      return (
        <div className="directionsList list">
          {etaDb[0] !== undefined ? (
            <Title1 className="top-row">
              {etaDb[0].stopTag} - {etaDb[0].stopName}
            </Title1>
          ) : null}
          <div className="countdown-row">
            <RefreshButton />
            <BookmarkButton
              stopId={stopId}
              name={etaDb[0].stopName}
              ttcId={etaDb[0].stopTag}
              lines={etaDb.map((item) => item.line)}
            />
          </div>
          {countdownGroupList.length > 0 && countdownGroupList}
          {countdownGroupList.length === 0 ? (
            <Title1>{t("reminder.noEta")}</Title1>
          ) : null}
          <RawDisplay data={data} />
        </div>
      );
    } else {
      // if (data.body.Error !== undefined)
      return (
        <div>
          <Title1>{t("reminder.failToLocate")}</Title1>
          <div className="countdown-row">
            <RefreshButton />
            <BookmarkButton
              stopId={stopId}
              name={etaDb[0].stopName}
              ttcId={etaDb[0].stopTag}
              lines={etaDb.map((item) => item.line)}
            />
          </div>
          <Text>{`${data.body.Error["#text"]}`}</Text>
          <RawDisplay data={data} />
        </div>
      );
    }
  } else {
    return (
      <div>
        <Title1>{t("reminder.loading")}</Title1>
        <div className="countdown-row">
          <RefreshButton />
        </div>
      </div>
    );
  }
}
export default StopPredictionInfo;
