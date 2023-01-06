import { Button, Text, Title1, Title2 } from "@fluentui/react-components";
import { ArrowClockwise24Regular } from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { BookmarkButton } from "../../features/bookmarks/BookmarkButton";
import { fluentStyles } from "../../styles/fluent";
import RawDisplay from "../RawDisplay";
import CountdownGroup from "../countdown/CountdownGroup";
import { Eta, etaParser } from "../parser/EtaParser";
import { FetchXMLWithCancelToken } from "./FetchUtils";

export interface LineStopEta {
  line: string;
  stopName: string;
  routeName: string;
  etas: Eta[];
  stopTag: number;
}

function StopPredictionInfo(props: { stopId: number }): JSX.Element {
  const [data, setData] = useState<any>();
  const [stopId] = useState(props.stopId);
  const [etaDb, setEtaDb] = useState<LineStopEta[]>([]);
  const [toggleFetch, setToggleFetch] = useState<boolean>(false);
  const { t } = useTranslation();
  const overrides = fluentStyles();

  const handleRefreshClick = () => {
    setToggleFetch(!toggleFetch);
    setData(null);
    setEtaDb([]);
  };

  const RefreshButton = function () {
    return (
      <Button
        className={overrides.refreshButton}
        onClick={handleRefreshClick}
        icon={<ArrowClockwise24Regular />}
      >
        {t("buttons.refresh")}
      </Button>
    );
  };

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
      if (error !== undefined) {
        return;
      }
      setData(parsedData);
      setEtaDb(etaParser(parsedData));
    });

    // when useEffect is called, the following clean-up fn will run first
    return () => {
      controller.abort();
    };
  }, [toggleFetch]);

  if (data) {
    console.log(etaDb);

    if (data.body.Error === undefined) {
      return (
        <div className="directionsList list">
          {etaDb[0] !== undefined ? (
            <Title2 className="top-row">
              {etaDb[0].stopTag} - {etaDb[0].stopName}
            </Title2>
          ) : null}
          <div className="countdown-row">
            <RefreshButton />
            <BookmarkButton
              stopId={stopId}
              name={etaDb[0].stopName}
              ttcId={etaDb[0].stopTag}
            />
          </div>

          {etaDb.map((element, index) => (
            <CountdownGroup key={index} detail={element} />
          ))}
          {etaDb.length === 1 && etaDb[0].line === "" ? (
            <Title1>{t("reminder.noRoute")}</Title1>
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
            />
          </div>
          <Text>{data.body.Error}</Text>
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
