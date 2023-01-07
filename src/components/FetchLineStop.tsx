// Not maintained for now: no appearant use when comparing to FetchStop
import { LargeTitle, Link, Text } from "@fluentui/react-components";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { RouteStopXml } from "../data/EtaXml";

const { XMLParser } = require("fast-xml-parser");

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
        const parser = new XMLParser({
          ignoreAttributes: false,
          attributeNamePrefix: "",
        });
        const dataJson = parser.parse(str);
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
            <Link appearance="subtle" onClick={fetchPredictionClick}>
              <LargeTitle>
                {data.body.predictions.stopTitle}
                {t("reminder.noRoute")}
              </LargeTitle>
            </Link>
          );
        }
        if (Array.isArray(data.body.predictions.direction)) {
          return (
            <div>
              {data.body.predictions.direction.map((line, index: number) => {
                return (
                  <div className="directionList list" key={`${index}`}>
                    <Text>{line.title}</Text>
                    {Array.isArray(line.prediction)
                      ? line.prediction.map(
                          (bus: { seconds: number }, index2: number) => {
                            return (
                              <Text key={`${index}-${index2}`}>
                                {bus.seconds}s
                              </Text>
                            );
                          }
                        )
                      : null}
                  </div>
                );
              })}
            </div>
          );
        } else {
          if (Array.isArray(data.body.predictions.direction.prediction)) {
            // Only 1 direction
            return (
              <div className="directionList list">
                {data.body.predictions.direction.prediction.map(
                  (bus: { seconds: number }, index: number) => {
                    return <Text key={`${index}`}>{bus.seconds}s</Text>;
                  }
                )}
              </div>
            );
          } else {
            // Only 1 time or only 1 direction

            return (
              <div className="directionsList list">
                <Text>{data.body.predictions.direction.title}</Text>
              </div>
            );
          }
        }
      }
    }
  } else {
    return (
      <Link appearance="subtle" onClick={fetchPredictionClick}>
        <LargeTitle>{t("reminder.wrongPlace")}</LargeTitle>
      </Link>
    );
  }
}
export default LineStopPredictionInfo;
