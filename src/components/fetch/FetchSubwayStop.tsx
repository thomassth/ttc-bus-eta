// Not maintained for now: no appearant use when comparing to FetchStop
import { Button, LargeTitle, Text } from "@fluentui/react-components";
import { ArrowClockwise24Regular } from "@fluentui/react-icons";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { SubwayStop } from "../../models/ttc";
import { fluentStyles } from "../../styles/fluent";
import { CountdownSec } from "../countdown/CountdownSec";
import RawDisplay from "../rawDisplay/RawDisplay";

function LineStopPredictionInfo(props: {
  line: number;
  stopNum: number;
}): JSX.Element {
  const [data, setData] = useState<SubwayStop>();
  const { t } = useTranslation();
  const fluentStyle = fluentStyles();

  const fetchPredictions = (
    line: number = props.line,
    stopNum: number = props.stopNum
  ) => {
    // let ans: Document;
    fetch(`https://ntas.ttc.ca/api/ntas/get-next-train-time/${stopNum}`, {
      method: "GET",
    }).then((response) => {
      response.text().then((str) => {
        const dataJson = JSON.parse(str);
        console.log(dataJson);
        setData(dataJson[0]);
      });
    });
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictionClick = useCallback(() => {
    fetchPredictions();
  }, []);

  function RefreshButton() {
    return (
      <Button
        className={fluentStyle.refreshButton}
        onClick={fetchPredictionClick}
        icon={<ArrowClockwise24Regular />}
      >
        {t("buttons.refresh")}
      </Button>
    );
  }

  if (data !== undefined) {
    if (data.Error !== undefined) {
      return <LargeTitle>{t("reminder.failToLocate")}</LargeTitle>;
    } else {
      if (data.nextTrains.length > 0) {
        const nextTrains = data.nextTrains.split(",");

        const listGroup = nextTrains.map((minute, index) => {
          return (
            <div key={index}>
              <CountdownSec second={Number.parseInt(minute) * 60} />
            </div>
          );
        });
        return (
          <div className="directionsList list">
            <LargeTitle>{data.directionText}</LargeTitle>
            <div className="countdown-row">
              <RefreshButton />
            </div>
            {listGroup}
            <RawDisplay data={data} />
          </div>
        );
      } else {
        return (
          <div className="directionsList list">
            <LargeTitle>{data.directionText}</LargeTitle>
            <div className="countdown-row">
              <RefreshButton />
            </div>
            <Text> {t("reminder.noEta")}</Text>
            <RawDisplay data={data} />
          </div>
        );
      }
    }
  } else {
    return (
      <div className="directionsList list">
        <LargeTitle>{t("reminder.loading")}</LargeTitle>
        <RefreshButton />
      </div>
    );
  }
}
export default LineStopPredictionInfo;
