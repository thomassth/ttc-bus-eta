import { Button, Text, Title1 } from "@fluentui/react-components";
import { ArrowClockwise24Regular } from "@fluentui/react-icons";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { EtaPredictionJson } from "../../models/etaJson.js";
import { EtaBusWithID, LineStopEta } from "../../models/etaObjects.js";
import { store } from "../../store/index.js";
import { settingsSelectors } from "../../store/settings/slice.js";
import { BookmarkButton } from "../bookmarks/BookmarkButton.js";
import CountdownGroup from "../countdown/CountdownGroup.js";
import { CountdownRow } from "../countdown/CountdownRow.js";
import SMSButton from "../eta/SMSButton.js";
import { etaParser } from "../parser/etaParser.js";
import RawDisplay from "../rawDisplay/RawDisplay.js";
import { getStopPredictions } from "./fetchUtils.js";

function StopPredictionInfo(props: { stopId: number }): JSX.Element {
  const [data, setData] = useState<EtaPredictionJson>();
  const [stopId] = useState(props.stopId);
  const [etaDb, setEtaDb] = useState<LineStopEta[]>([]);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<number>(Date.now());
  const { t } = useTranslation();
  const [unifiedEta, setUnifiedEta] = useState<EtaBusWithID[]>([]);

  const handleRefreshClick = useCallback(() => {
    setLastUpdatedAt(Date.now());
  }, [lastUpdatedAt]);

  const unifiedEtaValue =
    settingsSelectors.selectById(store.getState().settings, "unifiedEta")
      ?.value === "true";

  function RefreshButton() {
    return (
      <Button onClick={handleRefreshClick} icon={<ArrowClockwise24Regular />}>
        {t("buttons.refresh")}
      </Button>
    );
  }

  useEffect(() => {
    const controller = new AbortController();

    getStopPredictions(stopId, { signal: controller.signal }).then((data) => {
      if (data) {
        setData(data);
        setEtaDb(etaParser(data));
      }
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
    if (data.Error === undefined) {
      let listContent: JSX.Element[] = [];
      if (unifiedEtaValue) {
        listContent = unifiedEta.map((element, index) => {
          return (
            <li key={element.tripTag}>
              <CountdownRow item={element} index={index} />
            </li>
          );
        });
      } else {
        listContent = etaDb
          .filter((element) => element.etas.length > 0)
          .map((element) => {
            return (
              <CountdownGroup
                key={`${element.line}-${element.stopTag}`}
                detail={element}
              />
            );
          });
      }
      return (
        <div className="countdown-list-container">
          {etaDb[0] !== undefined ? (
            <Title1 className="top-row">
              Stop {stopId} - {etaDb[0].stopName}
            </Title1>
          ) : null}
          <div className="countdown-button-group">
            <RefreshButton />
            <BookmarkButton
              stopId={stopId}
              name={etaDb[0].stopName}
              ttcId={etaDb[0].stopTag}
              lines={etaDb.map((item) => item.line).flat()}
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
      // if (data.Error !== undefined)
      return (
        <div>
          <Title1>{t("reminder.failToLocate")}</Title1>
          <div className="countdown-button-group">
            <RefreshButton />
            <SMSButton stopId={stopId} />
          </div>
          <Text>{data.Error["#text"]}</Text>
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
        <div className="countdown-button-group">
          <RefreshButton />
          <SMSButton stopId={stopId} />
        </div>
      </div>
    );
  }
}
export default StopPredictionInfo;
