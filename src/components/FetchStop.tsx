import { Button, Text, Title1, Title2 } from "@fluentui/react-components";
import { ArrowClockwise24Regular } from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { fluentStyles } from "../styles/fluent";
import RawDisplay from "./RawDisplay";
import CountdownGroup from "./countdown/CountdownGroup";
import { Eta, etaParser } from "./parser/EtaParser";

const { XMLParser } = require("fast-xml-parser");

export interface LineStopEta {
  line: string;
  stopName: string;
  routeName: string;
  etas: Eta[];
}

function StopPredictionInfo(props: { stopId: number }): JSX.Element {
  const [data, setData] = useState<any>();
  const [stopId] = useState(props.stopId);
  const [etaDb, setEtaDb] = useState<LineStopEta[]>([]);
  const { t } = useTranslation();

  const RefreshButton = function () {
    return (
      <Button
        className={overrides.refreshButton}
        onClick={() => {
          fetchPredictions();
        }}
        icon={<ArrowClockwise24Regular />}
      >
        {t("buttons.refresh")}
      </Button>
    );
  };
  const overrides = fluentStyles();

  const fetchPredictions = (line: number = stopId) => {
    fetch(
      `https://webservices.umoiq.com/service/publicXMLFeed?command=predictions&a=ttc&stopId=${line}`,
      {
        method: "GET",
      }
    ).then((response) => {
      response.text().then((str) => {
        const parser = new XMLParser({
          ignoreAttributes: false,
          attributeNamePrefix: "@_",
        });
        const dataJson = parser.parse(str);
        setData(dataJson);
        console.log(dataJson);
        setEtaDb(etaParser(dataJson));
      });
    });
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  if (data != null) {
    console.log(etaDb);

    if (data.body.Error === undefined) {
      return (
        <div className="directionsList list">
          <RefreshButton />
          {etaDb[0] !== undefined ? <Title2>{etaDb[0].stopName}</Title2> : null}
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
          <RefreshButton />
          <Title1>{t("reminder.failToLocate")}</Title1>
          <Text>{data.body.Error}</Text>
          <RawDisplay data={data} />
        </div>
      );
    }
  } else {
    return (
      <div>
        <RefreshButton />
        <Title1>{t("reminder.loading")}</Title1>
      </div>
    );
  }
}
export default StopPredictionInfo;
