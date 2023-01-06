// Not maintained for now: no appearant use when comparing to FetchStop
import { LargeTitle, Link, Text } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const { XMLParser } = require("fast-xml-parser");

function LineStopPredictionInfo(props: {
  line: number;
  stopNum: number;
}): JSX.Element {
  const [data, setData] = useState<any>();
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
          attributeNamePrefix: "@_",
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

  function fetchPredictionClick(): void {
    fetchPredictions();
  }

  if (data !== undefined) {
    if (data.body.Error !== undefined) {
      return (
        <Link appearance="subtle" onClick={fetchPredictionClick}>
          <LargeTitle>{t("reminder.failToLocate")}</LargeTitle>
        </Link>
      );
    } else if (
      data.body.predictions["@_dirTitleBecauseNoPredictions"] !== undefined
    ) {
      return (
        <Link appearance="subtle" onClick={fetchPredictionClick}>
          <LargeTitle>
            {data.body.predictions["@_stopTitle"]}
            {t("reminder.noRoute")}
          </LargeTitle>
        </Link>
      );
    } else if (data.body.Error === undefined) {
      return (
        <div className="directionsList list">
          {/* {JSON.stringify(data.body)} */}
          {/* Only 1 time or only 1 direction */}
          {Array.isArray(data.body.predictions.direction) === false ? (
            <Text>{data.body.predictions.direction["@_title"]}</Text>
          ) : null}
          {/* Only 1 direction */}
          {Array.isArray(data.body.predictions.direction.isArray) === false ? (
            <div className="directionList list">
              {data.body.predictions.direction.prediction.map(
                (bus: any, index: number) => {
                  return <Text key={`${index}`}>{bus["@_seconds"]}s</Text>;
                }
              )}
            </div>
          ) : null}
          {/* Common scene */}
          {data.body.predictions.direction.length > 1
            ? data.body.predictions.direction.map(
                (line: any, index: number) => {
                  return (
                    <div className="directionList list" key={`${index}`}>
                      <Text>{line["@_title"]}</Text>
                      {line.prediction.map((bus: any, index2: number) => {
                        return (
                          <Text key={`${index}-${index2}`}>
                            {bus["@_seconds"]}s
                          </Text>
                        );
                      })}
                    </div>
                  );
                }
              )
            : null}
        </div>
      );
    } else {
      // if (data.body.Error !== undefined)
      return (
        <Link appearance="subtle" onClick={fetchPredictionClick}>
          <LargeTitle>{t("reminder.failToLocate")}</LargeTitle>
        </Link>
      );
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
