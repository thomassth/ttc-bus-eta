import { Text } from "@fluentui/react";
import { useEffect, useState } from "react";
import { boldStyle } from "../styles/fluent";
const { XMLParser } = require('fast-xml-parser');
function StopPredictionInfo(props: any): JSX.Element {
  const [data, setData] = useState<any>()
  const [lineNum] = useState(props.line)

  const fetchPredictions = (line: any = lineNum) => {
    // let ans: Document;
    fetch(`https://webservices.umoiq.com/service/publicXMLFeed?command=predictions&a=ttc&stopId=5164`, {
      method: "GET",
    }).then(response => {
      response.text()
        .then(str => {
          const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@_",
          });
          const dataJson = parser.parse(str)
          setData(dataJson);
          console.log(dataJson)
        });
    })
  }

  useEffect(() => {
    fetchPredictions()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function fetchPredictionClick(): void {
    fetchPredictions()
  }

  if (data != null) {
    if (data.body.Error !== undefined) {
      return (
        <div onClick={fetchPredictionClick}>
          <Text variant="xxLarge" styles={boldStyle}>
            Cannot locate this route.
          </Text>
        </div>)
    } else if (data.body.predictions["@_dirTitleBecauseNoPredictions"] !== undefined) {
      return (
        <div onClick={fetchPredictionClick}>
          <Text variant="xxLarge" styles={boldStyle}>
            No upcoming arrivals.
          </Text>
        </div>
      )
    }
    else if (data.body.Error === undefined) {
      return (
        <div className="directionsList list">
          {/* {JSON.stringify(data.body)} */}
          {/* Only 1 time or only 1 direction */}
          {/* {data.body.predictions.length === undefined ?
            <Text>
              {data.body.predictions.direction["@_title"]}
            </Text> : null
          } */}
          {/* Only 1 direction */}
          {/* {data.body.predictions.direction.length === undefined ?
            <div className="directionList list">
              {data.body.predictions.direction.prediction.map((element: any, index: number) => {
                return (
                  <Text key={`${index}`}>
                    {element["@_seconds"]}s
                  </Text>)
              })}
            </div>
            : null
          } */}
          {/* Common scene */}
          {data.body.predictions.length > 1 ?
            data.body.predictions.map((element: any, index: number) => {
              return (<div className="directionList list" key={`${index}`}>
                <Text styles={boldStyle} variant={"large"}>{element["@_routeTitle"]}</Text>
                {element["@_dirTitleBecauseNoPredictions"] === undefined ?
                  element.direction.prediction.map((element: any, index2: number) => {
                    return (
                      <Text key={`${index}-${index2}`}>
                        {element["@_seconds"]}s
                      </Text>)
                  })
                  : <Text>No upcoming arrivals</Text>}
              </div>)
            }) : null
          }
        </div>
      )
    }
    // if (data.body.Error !== undefined) 
    else {
      return (
        <div onClick={fetchPredictionClick}>
          <Text variant="xxLarge" styles={boldStyle}>
            Cannot locate this route.
          </Text>
        </div>)
    }
  }
  else {
    return (
      <div onClick={fetchPredictionClick}>
        <Text variant="xxLarge" styles={boldStyle}>
          Loading...
        </Text>
      </div>)
  }
};
export default StopPredictionInfo