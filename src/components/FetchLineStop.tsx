// Not maintained for now: no appearant use when comparing to FetchStop
import { LargeTitle, Link, Text } from "@fluentui/react-components";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { RouteStopXml } from "../data/etaXml";
import RawDisplay from "./RawDisplay";
import { CountdownSec } from "./countdown/CountdownSec";
import { xmlParser } from "./parser/parserUtils";

function LineStopPredictionInfo(props: {
  line: number;
  stopNum: number;
}): JSX.Element {
  const [data, setData] = useState<RouteStopXml>();
  const { t } = useTranslation();

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
        console.log(dataJson);
      });
    });
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictionClick = useCallback(() => {
    fetchPredictions();
  }, []);

  if (data !== undefined) {
    if (data.body.Error !== undefined) {
      return (
        <Link appearance="subtle" onClick={fetchPredictionClick}>
          <LargeTitle>{t("reminder.failToLocate")}</LargeTitle>
        </Link>
      );
    } else {
      if (Array.isArray(data.body.predictions)) {
        // TODO
        return <div />;
      } else {
        if (data.body.predictions.dirTitleBecauseNoPredictions !== undefined) {
          return (
            <div className="directionsList list">
              <Link appearance="subtle" onClick={fetchPredictionClick}>
                <LargeTitle>{data.body.predictions.stopTitle}</LargeTitle>
              </Link>
              <Text> {t("reminder.noRoute")}</Text>
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

          return <div>{directionListGroup}</div>;
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
                <Link appearance="subtle" onClick={fetchPredictionClick}>
                  <LargeTitle>{data.body.predictions.stopTitle}</LargeTitle>
                </Link>
                <div className="directionList list">{directionListGroup}</div>
                <RawDisplay data={data} />
              </div>
            );
          } else {
            // Only 1 time or only 1 direction

            return (
              <div className="directionsList list">
                <Link appearance="subtle" onClick={fetchPredictionClick}>
                  <LargeTitle>{data.body.predictions.stopTitle}</LargeTitle>
                </Link>
                <RawDisplay data={data} />
              </div>
            );
          }
        }
      }
    }
  } else {
    return (
      <Link appearance="subtle" onClick={fetchPredictionClick}>
        <LargeTitle>{t("reminder.loading")}</LargeTitle>
      </Link>
    );
  }
}
export default LineStopPredictionInfo;
