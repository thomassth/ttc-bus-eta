import { Text } from "@fluentui/react";
import { useEffect, useState } from "react";
import { boldStyle } from "../styles/fluent";
import CountdownGroup from "./CountdownSec";
const { XMLParser } = require('fast-xml-parser');

function StopPredictionInfo(props: any): JSX.Element {
  const [data, setData] = useState<any>()
  const [stopId] = useState(props.stopId)
  const [etaDb, setEtaDb] = useState<{ line: string, title:string, etas: { id: number; second: any; busId: any; }[]; }[]>([])

  const fetchPredictions = (line: any = stopId) => {
    // let ans: Document;
    fetch(`https://webservices.umoiq.com/service/publicXMLFeed?command=predictions&a=ttc&stopId=${stopId}`, {
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
          setEtaDb(createEtaDb(dataJson))
        });
    })
  }

  useEffect(() => {
    fetchPredictions()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (data != null) {
    if (data.body.Error !== undefined) {
      return (
        <div onClick={() => fetchPredictions}>
          <Text variant="xxLarge" styles={boldStyle}>
            Cannot locate this route.
          </Text>
        </div>)
    }    else if (etaDb.length > 0) {
      return (
        <div className="directionsList list">
          <Text variant="large">{etaDb[0] !== undefined ? etaDb[0].title:""}</Text>
          {etaDb.map((element, index) =>
            <CountdownGroup key={index} obj={element}/>
              )}
        </div>
      )
    } else if (etaDb.length === 0) {
      return (
        <div onClick={() => fetchPredictions}>
          <Text variant="xxLarge" styles={boldStyle}>
            No upcoming arrivals.
          </Text>
        </div>
      )
    }
    // if (data.body.Error !== undefined) 
    else {
      return (
        <div onClick={() => fetchPredictions}>
          <Text variant="xxLarge" styles={boldStyle}>
            Cannot locate this route.
          </Text>
        </div>)
    }
  }
  else {
    return (
      <div onClick={() => fetchPredictions}>
        <Text variant="xxLarge" styles={boldStyle}>
          Loading...
        </Text>
      </div>)
  }
};
export default StopPredictionInfo

const createEtaDb = (json: any) => {
  let result: { line: string, title:string, etas: { id: number; second: any; busId: any; }[]; }[] = []

  if (json.body.predictions.length === undefined) {
    //A. single line
    if (json.body.predictions["@_dirTitleBecauseNoPredictions"] === undefined) {
    result.push({
      line: json.body.predictions["@_routeTitle"],
      title: json.body.predictions["@_stopTitle"],
      etas: []
    })      
    json.body.predictions.direction.prediction.map((element: any, index: number) => {
      result[result.length - 1].etas.push({
        id: index,
        second: element["@_seconds"],
        busId: element["@_vehicle"]
      })
      return null
    })}
  } else {
    json.body.predictions.map((element: any, index: number) => {
      //Only lines with etas are listed
      if (element["@_dirTitleBecauseNoPredictions"] === undefined) {
        result.push({
          line: element["@_routeTitle"],
          title: element["@_stopTitle"],
          etas: []
        })
        element.direction.prediction.map((el2: any, index2: number) => {
          result[result.length - 1].etas.push({
            id: index2,
            second: el2["@_seconds"],
            busId: el2["@_vehicle"]
          })
          return null
        })
        return null
      }
      return null
    })
  }
  console.log(result)
  return result
}
