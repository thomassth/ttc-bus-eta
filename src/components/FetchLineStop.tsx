// Not maintained for now: no appearant use when comparing to FetchStop
import { Button, LargeTitle, Text } from "@fluentui/react-components";
import { ArrowClockwise24Regular } from "@fluentui/react-icons";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { RouteStopXml } from "../data/etaXml";
import { fluentStyles } from "../styles/fluent";
import RawDisplay from "./RawDisplay";
import { CountdownSec } from "./countdown/CountdownSec";
import { xmlParser } from "./parser/parserUtils";

function LineStopPredictionInfo(props: {
  line: number;
  stopNum: number;
}): JSX.Element {
  const [data, setData] = useState<RouteStopXml>();
  const { t } = useTranslation();
  const fluentStyle = fluentStyles();

  const fetchPredictions = (
    line: number = props.line,
    stopNum: number = props.stopNum
  ) => {
    // let ans: Document;
    fetch(
      `https://webservices.umoiq.com/service/publicXMLFeed?command=predictions&a=ttc&r=${line}&s=${stopNum}`,
      {
        method: "GET",
      }
    ).then((response) => {
      response.text().then((str) => {
        const dataJson = xmlParser.parse(str);
        setData(dataJson);
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
    if (data.body.Error !== undefined) {
      return <LargeTitle>{t("reminder.failToLocate")}</LargeTitle>;
    } else {
      if (Array.isArray(data.body.predictions)) {
        // TODO
        return <div />;
      } else {
        if (data.body.predictions.dirTitleBecauseNoPredictions !== undefined) {
          return (
            <div className="directionsList list">
              <LargeTitle>{data.body.predictions.stopTitle}</LargeTitle>
              <div className="countdown-row">
                <RefreshButton />
              </div>
              <Text> {t("reminder.noEta")}</Text>
              <RawDisplay data={data} />
            </div>
          );
        }
        if (Array.isArray(data.body.predictions.direction)) {
          const directionListGroup = data.body.predictions.direction.map(
            (line, index: number) => {
              return (
                <div className="directionList list" key={`${index}`}>
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
            }
          );

          return (
            <div>
              <div className="countdown-row">
                <RefreshButton />
              </div>
              {directionListGroup}
            </div>
          );
        } else {
          if (Array.isArray(data.body.predictions.direction.prediction)) {
            const directionListGroup =
              data.body.predictions.direction.prediction.map((bus) => {
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
                <LargeTitle>{data.body.predictions.stopTitle}</LargeTitle>
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
                <LargeTitle>{data.body.predictions.stopTitle}</LargeTitle>
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
