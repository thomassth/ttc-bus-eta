import { LargeTitle, Text } from "@fluentui/react-components";
import axios from "axios";
import { useEffect, useState } from "react";
const { XMLParser } = require("fast-xml-parser");

function PredictionInfo(props: any): JSX.Element {
  const [data, setData] = useState<any>();

  const fetchPredictions = async (
    line: Number = props.line,
    stopNum: Number = props.stopNum
  ) => {
    // let ans: Document;
    const res = await axios.get(`https://webservices.umoiq.com/service/publicXMLFeed?command=predictions&a=ttc&r=${line}&s=${stopNum}`);
    console.log(res)
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
    });
    const dataJson = parser.parse(res.data);
    console.log(dataJson);
    setData(dataJson);

  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  function fetchPredictionClick(): void {
    fetchPredictions();
  }

  if (data != null) {
    if (data.body.Error !== undefined) {
      return (
        <div onClick={fetchPredictionClick}>
          <LargeTitle>Cannot locate this route.</LargeTitle>
        </div>
      );
    } else if (
      data.body.predictions["@_dirTitleBecauseNoPredictions"] !== undefined
    ) {
      return (
        <div onClick={fetchPredictionClick}>
          <LargeTitle>No upcoming arrivals.</LargeTitle>
        </div>
      );
    } else if (data.body.Error === undefined) {
      return (
        <div className="directionsList list">
          {/* {JSON.stringify(data.body)} */}
          {/* Only 1 time or only 1 direction */}
          {data.body.predictions.direction.length === undefined ? (
            <Text>{data.body.predictions.direction["@_title"]}</Text>
          ) : null}
          {/* Only 1 direction */}
          {data.body.predictions.direction.length === undefined ? (
            <div className="directionList list">
              {data.body.predictions.direction.prediction.map(
                (element: any, index: number) => {
                  return <Text key={`${index}`}>{element["@_seconds"]}s</Text>;
                }
              )}
            </div>
          ) : null}
          {/* Common scene */}
          {data.body.predictions.direction.length > 1
            ? data.body.predictions.direction.map(
              (element: any, index: number) => {
                return (
                  <div className="directionList list" key={`${index}`}>
                    <Text>{element["@_title"]}</Text>
                    {element.prediction.map(
                      (element: any, index2: number) => {
                        return (
                          <Text key={`${index}-${index2}`}>
                            {element["@_seconds"]}s
                          </Text>
                        );
                      }
                    )}
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
        <div onClick={fetchPredictionClick}>
          <LargeTitle>Cannot locate this route.</LargeTitle>
        </div>
      );
    }
  } else {
    return (
      <div onClick={fetchPredictionClick}>
        <LargeTitle>Shouldn&apos;t be here :/</LargeTitle>
      </div>
    );
  }
}
export default PredictionInfo;
