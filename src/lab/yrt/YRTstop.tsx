import { Text, Title2 } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { YRTBadge } from "../../components/badges.js";
import { CountdownSec } from "../../components/countdown/CountdownSec.js";
import { CountdownItems, StopRequest } from "../../models/yrt.js";
import styles from "./yrt.module.css";

export function YRTStop() {
  const params = useParams();
  const stopNum = parseInt(`${params.stopId}`);

  const [response, setResponse] = useState<StopRequest>({});
  const [countdownItems, setCountdownItems] = useState<CountdownItems[]>();
  useEffect(() => {
    document.title = `Stop ID ${stopNum} | YRT arrivals`;
  });
  useEffect(() => {
    const controller = new AbortController();

    const fetchEtaData = async () => {
      let response = {};
      await fetch(`https://tripplanner.yrt.ca/InfoWeb`, {
        signal: controller.signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json text/plain, */*",
        },
        body: JSON.stringify({
          version: "1.1",
          method: "GetBusTimes",
          params: {
            LinesRequest: {
              Radius: -1,
              GetStopTimes: "1",
              GetStopTripInfo: "1",
              NumStopTimes: 150,
              SuppressLinesUnloadOnly: "1",
              Client: "MobileWeb",
              StopId: stopNum,
              EnableRealTime: true,
              NumTimesPerLine: 10,
            },
          },
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          response = json;
        });

      return response;
    };
    fetchEtaData().then((response) => {
      setResponse(response);
    });
  }, []);

  useEffect(() => {
    if (
      response.result?.[0] &&
      response.result?.[0].Validation[0].Type !== "error"
    ) {
      const lineDirMap = new Map<number, any>();
      response.result?.[0].StopTimeResult[0].Lines.map((item) => {
        lineDirMap.set(item.LineDirId, item);
        return item;
      });

      setCountdownItems(
        response.result?.[0].RealTimeResults.map((item) => ({
          sec: item.RealTimeSPC,
          LineName: lineDirMap.get(item.LineDirId).LineName,
          LineAbbr: lineDirMap.get(item.LineDirId).LineAbbr,
        }))
      );
    }

    return () => {
      // second
    };
  }, [response.result]);

  if (response.result) {
    if (response.result?.[0].Validation[0].Type !== "error") {
      return (
        <main className={styles["yrt-main"]}>
          {response.result?.[0].RealTimeResults.length === 0 && (
            <Title2>Stop {params.stopId} has no real time results.</Title2>
          )}
          <Title2>{`YRT STOP ${params.stopId}`}</Title2>
          <Title2>
            {response.result?.[0].StopTimeResult[0].Lines[0].StopName}
          </Title2>
          <br />
          <Text>
            {response.result?.[0].StopTimeResult[0].Lines[0].DirectionName}
          </Text>
          <YRTCountdownItems items={countdownItems ?? []} />
        </main>
      );
    } else
      return (
        <main className={styles["yrt-main"]}>
          <Title2>Stop {params.stopId} has no results.</Title2>
          <Text>{response.result?.[0].Validation[0].Message}</Text>
        </main>
      );
  } else {
    return (
      <main className={styles["yrt-main"]}>
        <Title2>Stop {params.stopId} loading...</Title2>
      </main>
    );
  }
}

const YRTCountdownItems = (props: {
  items: { sec: number; LineName: string; LineAbbr: string }[];
}) => {
  const items = props.items;
  const CountdownRows = [];
  if (Array.isArray(items) && items.length)
    for (const i in items) {
      const item = items[i];
      CountdownRows.push(
        <li>
          <div className={styles["line-info"]}>
            <YRTBadge lineAbbr={item.LineAbbr} />
            <Text>{item.LineName}</Text>
          </div>
          <CountdownSec key={i} second={item.sec} />
        </li>
      );
    }
  return <ul>{CountdownRows}</ul>;
};
