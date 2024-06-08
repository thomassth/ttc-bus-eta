// Not maintained for now: no appearant use when comparing to FetchStop
import { Button, LargeTitle, Text } from "@fluentui/react-components";
import { ArrowClockwise24Regular } from "@fluentui/react-icons";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { EtaPredictionJson } from "../../models/etaJson.js";
import { CountdownSec } from "../countdown/CountdownSec.js";
import RawDisplay from "../rawDisplay/RawDisplay.js";
import { getLineStopPredictions } from "./fetchUtils.js";

function LineStopPredictionInfo(props: {
  line: number;
  stopNum: number;
}): JSX.Element {
  const [data, setData] = useState<EtaPredictionJson>();
  const { t } = useTranslation();

  const fetchPredictions = async (
    line = props.line,
    stopNum = props.stopNum
  ) => {
    // let ans: Document;
    const data = await getLineStopPredictions(line, stopNum, {});
    setData(data);
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

  if (data) {
    if (data.Error) {
      return <LargeTitle>{t("reminder.failToLocate")}</LargeTitle>;
    } else {
      if (Array.isArray(data.predictions)) {
        // TODO
        return <div />;
      } else {
        if (data.predictions?.dirTitleBecauseNoPredictions) {
          return (
            <div className="directionsList list">
              <LargeTitle>{data.predictions.stopTitle}</LargeTitle>
              <div className="countdown-row">
                <RefreshButton />
              </div>
              <Text> {t("reminder.noEta")}</Text>
              <RawDisplay data={data} />
            </div>
          );
        }
        if (Array.isArray(data.predictions?.direction)) {
          const directionListGroup = data.predictions.direction.map((line) => {
            return (
              <div className="directionList list" key={line.title}>
                <Text>{line.title}</Text>
                {Array.isArray(line.prediction) ? (
                  line.prediction.map((bus) => {
                    return (
                      <CountdownSec
                        second={bus.seconds}
                        epochTime={bus.epochTime}
                        key={bus.tripTag}
                      />
                    );
                  })
                ) : (
                  <CountdownSec
                    second={line.prediction.seconds}
                    epochTime={line.prediction.epochTime}
                    key={line.prediction.tripTag}
                  />
                )}
              </div>
            );
          });

          return (
            <div>
              <div className="countdown-row">
                <RefreshButton />
              </div>
              {directionListGroup}
            </div>
          );
        } else {
          if (Array.isArray(data.predictions?.direction.prediction)) {
            const directionListGroup =
              data.predictions.direction.prediction.map((bus) => {
                return (
                  <CountdownSec
                    second={bus.seconds}
                    epochTime={bus.epochTime}
                    key={bus.tripTag}
                  />
                );
              });
            // Only 1 direction
            return (
              <div className="directionsList list">
                <LargeTitle>{data.predictions.stopTitle}</LargeTitle>
                <div className="countdown-row">
                  <RefreshButton />
                </div>
                <div className="directionList list">{directionListGroup}</div>
                <RawDisplay data={data} />
              </div>
            );
          } else {
            // Only 1 time or only 1 direction

            return (
              <div className="directionsList list">
                <LargeTitle>{data.predictions?.stopTitle}</LargeTitle>
                <RefreshButton />
                <RawDisplay data={data} />
              </div>
            );
          }
        }
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
