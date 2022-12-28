import { Title1, Title2 } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import CountdownGroup from "./countdown/CountdownGroup";
import { EtaParser } from "./parser/EtaParser";
const { XMLParser } = require("fast-xml-parser");

function StopPredictionInfo(props: any): JSX.Element {
  const [data, setData] = useState<any>();
  const [stopId] = useState(props.stopId);
  const [etaDb, setEtaDb] = useState<
    {
      line: string;
      title: string;
      etas: { id: number; second: any; busId: any }[];
    }[]
  >([]);

  const fetchPredictions = (line: any = stopId) => {
    // let ans: Document;
    fetch(
      `https://webservices.umoiq.com/service/publicXMLFeed?command=predictions&a=ttc&stopId=${stopId}`,
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
        setEtaDb(EtaParser(dataJson));
      });
    });
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  if (data != null) {
    console.log(etaDb);
    if (data.body.Error !== undefined) {
      return (
        <div onClick={() => fetchPredictions}>
          <Title1>Cannot locate this route.</Title1>
        </div>
      );
    } else if (etaDb.length > 0) {
      return (
        <div className="directionsList list">
          <Title2>{etaDb[0] !== undefined ? etaDb[0].title : ""}</Title2>
          {etaDb.map((element, index) => (
            <CountdownGroup key={index} obj={element} />
          ))}
        </div>
      );
    } else if (etaDb.length === 0) {
      console.log(etaDb);
      return (
        <div onClick={() => fetchPredictions}>
          <Title1>No upcoming arrivals.</Title1>
        </div>
      );
    } else {
      // if (data.body.Error !== undefined)
      return (
        <div onClick={() => fetchPredictions}>
          <Title1>Cannot locate this route.</Title1>
        </div>
      );
    }
  } else {
    return (
      <div onClick={() => fetchPredictions}>
        <Title1>Loading...</Title1>
      </div>
    );
  }
}
export default StopPredictionInfo;
