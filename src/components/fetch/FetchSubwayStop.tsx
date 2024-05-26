import { Button, LargeTitle, Text } from "@fluentui/react-components";
import { ArrowClockwise24Regular } from "@fluentui/react-icons";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { SubwayStop } from "../../models/ttc.js";
import { CountdownSec } from "../countdown/CountdownSec.js";
import RawDisplay from "../rawDisplay/RawDisplay.js";
import { getTTCSubwayPredictions } from "./fetchUtils.js";

function LineStopPredictionInfo(props: {
  line: number;
  stopNum: number;
}): JSX.Element {
  const [data, setData] = useState<SubwayStop>();
  const { t } = useTranslation();

  const fetchPredictions = (stopNum = props.stopNum) => {
    getTTCSubwayPredictions(stopNum, {}).then((dataJson) => {
      setData(dataJson[0]);
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
      <Button onClick={fetchPredictionClick} icon={<ArrowClockwise24Regular />}>
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
