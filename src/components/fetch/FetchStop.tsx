import { Button, Title1 } from "@fluentui/react-components";
import { ArrowClockwise24Regular } from "@fluentui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { EtaBusWithID } from "../../models/etaObjects.js";
import { store } from "../../store/index.js";
import { settingsSelectors } from "../../store/settings/slice.js";
import { getStopsByTag } from "../../store/ttcStopsDb.js";
import { DirectionBadge } from "../badges.js";
import { BookmarkButton } from "../bookmarks/BookmarkButton.js";
import CountdownGroup from "../countdown/CountdownGroup.js";
import { CountdownRow } from "../countdown/CountdownRow.js";
import SMSButton from "../eta/SMSButton.js";
import { etaParser } from "../parser/etaParser.js";
import RawDisplay from "../rawDisplay/RawDisplay.js";
import style from "./FetchStop.module.css";
import { ttcStopPrediction } from "./queries.js";

function RefreshButton({
  handleRefreshClick,
}: {
  handleRefreshClick: () => void;
}) {
  const { t } = useTranslation();

  return (
    <Button onClick={handleRefreshClick} icon={<ArrowClockwise24Regular />}>
      {t("buttons.refresh")}
    </Button>
  );
}
function StopPredictionInfo(props: { stopId: number }): JSX.Element {
  const stopId = props.stopId;
  const [lastUpdatedAt, setLastUpdatedAt] = useState<number>(Date.now());
  const { t } = useTranslation();
  const ttcStopPredictionResponse = useQuery({
    ...ttcStopPrediction(stopId),
    queryKey: [`ttc-stop-${stopId}`, lastUpdatedAt.toString()],
  });

  const handleRefreshClick = useCallback(() => {
    setLastUpdatedAt(Date.now());
  }, [lastUpdatedAt]);

  useEffect(() => {
    getStopsByTag(stopId.toString()).then((result) => {
      console.log("result", result);
    });
  }, [stopId]);

  const unifiedEtaValue =
    settingsSelectors.selectById(store.getState().settings, "unifiedEta")
      ?.value === "true";

  const etaDb = useMemo(() => {
    if (ttcStopPredictionResponse.data) {
      return etaParser(ttcStopPredictionResponse.data);
    } else {
      return [];
    }
  }, [ttcStopPredictionResponse.data]);

  const unifiedEta = useMemo(() => {
    let templist: EtaBusWithID[] = [];
    for (const list of etaDb) {
      if (list.etas) templist = templist.concat(list.etas);
    }
    return templist.sort((a, b) => a.epochTime - b.epochTime);
  }, [etaDb]);

  if (ttcStopPredictionResponse.data) {
    const data = ttcStopPredictionResponse.data;
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
          .filter((element) => (element.etas ?? []).length > 0)
          .map((element) => {
            return (
              <CountdownGroup
                key={`${element.line}-${element.stopTag}`}
                detail={element}
              />
            );
          });
      }

      const directions: Set<string> = new Set();

      etaDb.forEach((item) => {
        if (item.direction) directions.add(item.direction);
      });
      return (
        <div className="countdown-list-container">
          {etaDb[0] && (
            <>
              <span className={style["top-row"]}>
                Stop {stopId}
                {directions.size === 1 && (
                  <DirectionBadge
                    direction={Array.from(directions.values())[0]}
                  />
                )}
              </span>
              <div className={style["stop-name"]}>
                <Title1 as="h1">
                  {etaDb[0].stopName.replace("At", "\nAt")}
                </Title1>
              </div>
            </>
          )}
          <div className="countdown-button-group">
            <RefreshButton handleRefreshClick={handleRefreshClick} />
            {etaDb[0] && (
              <BookmarkButton
                stopId={stopId}
                name={etaDb[0].stopName}
                ttcId={etaDb[0].stopTag}
                lines={etaDb.map((item) => item.line).flat()}
                direction={etaDb[0].direction}
              />
            )}
          </div>
          {navigator.onLine ? null : (
            <span>Device seems to be offline. Results may be inaccurate.</span>
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
      // if (data.Error)
      return (
        <div>
          <Title1>{t("reminder.failToLocate")}</Title1>
          <div className="countdown-button-group">
            <RefreshButton handleRefreshClick={handleRefreshClick} />
            <SMSButton stopId={stopId} />
          </div>
          <span>{data.Error["#text"]}</span>
          <RawDisplay data={data} />
        </div>
      );
    }
  } else {
    return (
      <div>
        {ttcStopPredictionResponse.status === "pending" ? (
          <Title1>{t("reminder.loading")}</Title1>
        ) : (
          <>
            <Title1>Stop {stopId}</Title1>
            <br />
            <Title1>Your device seems to be offline.</Title1>
          </>
        )}
        <div className="countdown-button-group">
          <RefreshButton handleRefreshClick={handleRefreshClick} />
          <SMSButton stopId={stopId} />
        </div>
      </div>
    );
  }
}
export default StopPredictionInfo;
