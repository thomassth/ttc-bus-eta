import { Title1, Title2 } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import CountdownGroup from "./countdown/CountdownGroup";
import { etaParser } from "./parser/EtaParser";
import RawDisplay from "./RawDisplay";
const { XMLParser } = require("fast-xml-parser");

function StopPredictionInfo(props: any): JSX.Element {
  const [data, setData] = useState<any>();
  const [stopId] = useState(props.stopId);
  const [etaDb, setEtaDb] = useState<
    {
      line: string;
      stopName: string;
      etas: { id: number; second: any; busId: any }[];
    }[]
  >([]);

  const fetchPredictions = (line: any = stopId) => {
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
        setEtaDb(etaParser(dataJson));
      });
    });
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  if (data != null) {
    console.log(etaDb);

    if (data.body.Error === undefined) {
      if (etaDb.length > 0) {
        return (
          <div className="directionsList list">
            <Title2>{etaDb[0] !== undefined ? etaDb[0].stopName : ""}</Title2>
            {etaDb.map((element, index) => (
              <CountdownGroup key={index} obj={element} />
            ))}
            <RawDisplay data={data}></RawDisplay>
          </div>
        );
      } else {
        console.log(etaDb);
        return (
          <div onClick={() => fetchPredictions}>
            <Title1>No upcoming arrivals.</Title1>
            <RawDisplay data={data}></RawDisplay>
          </div>
        );
      }
    } else {
      // if (data.body.Error !== undefined)
      return (
        <div onClick={() => fetchPredictions}>
          <Title1>Cannot locate this route.</Title1>
          <RawDisplay data={data}></RawDisplay>
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
