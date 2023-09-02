import { Button, Text, Title1 } from "@fluentui/react-components";
import { ArrowClockwise24Regular } from "@fluentui/react-icons";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { EtaBusWithID, LineStopEta } from "../../models/etaObjects";
import { EtaPredictionXml } from "../../models/etaXml";
import { store } from "../../store";
import { settingsSelectors } from "../../store/settings/slice";
import { fluentStyles } from "../../styles/fluent";
import { BookmarkButton } from "../bookmarks/BookmarkButton";
import CountdownGroup from "../countdown/CountdownGroup";
import { CountdownRow } from "../countdown/CountdownRow";
import SMSButton from "../eta/SMSButton";
import { etaParser } from "../parser/etaParser";
import RawDisplay from "../rawDisplay/RawDisplay";
import { FetchXMLWithCancelToken } from "./fetchUtils";

function StopPredictionInfo(props: { stopId: number }): JSX.Element {
  const [data, setData] = useState<EtaPredictionXml>();
  const [stopId] = useState(props.stopId);
  const [etaDb, setEtaDb] = useState<LineStopEta[]>([]);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<number>(Date.now());
  const { t } = useTranslation();
  const fluentStyle = fluentStyles();
  const [unifiedEta, setUnifiedEta] = useState<EtaBusWithID[]>([]);

  const handleRefreshClick = useCallback(() => {
    setLastUpdatedAt(Date.now());
  }, [lastUpdatedAt]);

  const unifiedEtaValue =
    settingsSelectors.selectById(store.getState().settings, "unifiedEta")
      ?.value === "true";

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

  useEffect(() => {
    let templist: EtaBusWithID[] = [];
    for (const list of etaDb) {
      templist = templist.concat(list.etas);
    }
    setUnifiedEta(templist.sort((a, b) => a.epochTime - b.epochTime));
  }, [etaDb]);

  if (data) {
    if (data.body.Error === undefined) {
      let listContent: JSX.Element[] = [];
      if (unifiedEtaValue) {
        listContent = unifiedEta.map((element) => {
          return (
            <li key={element.tripTag}>
              <CountdownRow item={element} />
            </li>
          );
        });
      } else {
        listContent = etaDb.map((element) => {
          return (
            <CountdownGroup
              key={`${element.line}-${element.stopTag}`}
              detail={element}
            />
          );
        });
      }
      return (
        <div className="countdownListContainer">
          {etaDb[0] !== undefined ? (
            <Title1 className="top-row">
              Stop {stopId} - {etaDb[0].stopName}
            </Title1>
          ) : null}
          <div className="countdownButtonGroup">
            <RefreshButton />
            <BookmarkButton
              stopId={stopId}
              name={etaDb[0].stopName}
              ttcId={etaDb[0].stopTag}
              lines={etaDb.map((item) => item.line)}
            />
          </div>
          {navigator.onLine ? null : (
            <Text>Device seems to be offline. Results may be inaccurate.</Text>
          )}
          {listContent.length > 0 ? (
            <ul>{listContent}</ul>
          ) : (
            <>
              <Title1>{t("reminder.noEta")}</Title1>
              <br />
              <SMSButton stopId={stopId} />
            </>
          )}
          <RawDisplay data={data} />
        </div>
      );
    } else {
      // if (data.body.Error !== undefined)
      return (
        <div>
          <Title1>{t("reminder.failToLocate")}</Title1>
          <div className="countdownButtonGroup">
            <RefreshButton />
            <BookmarkButton
              stopId={stopId}
              name={etaDb[0].stopName}
              ttcId={etaDb[0].stopTag}
              lines={etaDb.map((item) => item.line)}
            />
            <SMSButton stopId={stopId} />
          </div>
          <Text>{`${data.body.Error["#text"]}`}</Text>
          <RawDisplay data={data} />
        </div>
      );
    }
  } else {
    return (
      <div>
        {navigator.onLine ? (
          <Title1>{t("reminder.loading")}</Title1>
        ) : (
          <>
            <Title1 className="top-row">Stop {stopId}</Title1>
            <br />
            <Title1>Your device seems to be offline.</Title1>
          </>
        )}
        <div className="countdownButtonGroup">
          <RefreshButton />
          <SMSButton stopId={stopId} />
        </div>
      </div>
    );
  }
}
export default StopPredictionInfo;
