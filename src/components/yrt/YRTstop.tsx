import { Text, Title2 } from "@fluentui/react-components";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router";
import type { StopRequest } from "../../models/yrt.js";
import { YRTBadge } from "../badges.js";
import { CountdownSec } from "../countdown/CountdownSec.js";
import { getYrtStops } from "../fetch/queries.js";
import RawDisplay from "../rawDisplay/RawDisplay.js";
import styles from "./yrt.module.css";

const YRTCountdownItems = (props: {
  items: { sec: number; LineName: string; LineAbbr: string }[];
}) => {
  const items = props.items;

  const CountdownRows = (items ?? []).map((item) => (
    <li key={i}>
      <div className={styles["line-info"]}>
        <YRTBadge lineAbbr={item.LineAbbr} />
        <Text>{item.LineName}</Text>
      </div>
      <CountdownSec second={item.sec} />
    </li>
  ));

  return <ul>{CountdownRows}</ul>;
};

export default function YRTStop() {
  const params = useParams();
  const stopId = params.stopId;
  const yrtStops = useQuery(getYrtStops);

  const stopQueryNum = useMemo(() => {
    if (!stopId) {
      return "";
    }
    return (
      yrtStops.data?.find((item) => item.stopPublicId === stopId)?.stopId ?? ""
    );
  }, []);

  useEffect(() => {
    document.title = `Stop ID ${stopId} | YRT arrivals`;
  }, [stopId]);

  const yrtStopPrediction = useQuery<StopRequest>({
    queryKey: [`yrt-stop-id-${stopQueryNum}`],
    queryFn: async () => {
      const response = await fetch("https://tripplanner.yrt.ca/InfoWeb", {
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
              StopId: Number.parseInt(stopQueryNum),
              EnableRealTime: true,
              NumTimesPerLine: 10,
            },
          },
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    enabled: stopQueryNum.length > 0,
  });

  const countdownItems = useMemo(() => {
    const response = yrtStopPrediction.data;
    if (
      response?.result?.[0] &&
      response.result?.[0].Validation[0].Type !== "error"
    ) {
      const lineDirMap = new Map<
        number,
        { LineName: string; LineAbbr: string }
      >();
      response.result?.[0].StopTimeResult[0].Lines.map((item) => {
        lineDirMap.set(item.LineDirId, item);
        return item;
      });

      return response.result?.[0].RealTimeResults.map((item) => ({
        sec: item.RealTimeSPC,
        LineName: lineDirMap.get(item.LineDirId)?.LineName ?? "",
        LineAbbr: lineDirMap.get(item.LineDirId)?.LineAbbr ?? "",
      }));
    }
    return [];
  }, [yrtStopPrediction.data]);

  if (yrtStopPrediction.data?.result) {
    if (yrtStopPrediction.data.result?.[0].Validation[0].Type !== "error") {
      return (
        <main className={styles["yrt-main"]}>
          {yrtStopPrediction.data.result?.[0].RealTimeResults.length === 0 && (
            <Title2>Stop {params.stopId} has no real time results.</Title2>
          )}
          <Title2>{`YRT STOP ${stopId}`}</Title2>
          <Title2>
            {
              yrtStopPrediction.data.result?.[0].StopTimeResult[0].Lines[0]
                .StopName
            }
          </Title2>
          <br />
          <Text>
            {
              yrtStopPrediction.data.result?.[0].StopTimeResult[0].Lines[0]
                .DirectionName
            }
          </Text>
          <YRTCountdownItems items={countdownItems} />
          <RawDisplay data={yrtStopPrediction.data} />
        </main>
      );
    }
    return (
      <main className={styles["yrt-main"]}>
        <Title2>Stop {params.stopId} has no results.</Title2>
        <Text>{yrtStopPrediction.data.result?.[0].Validation[0].Message}</Text>
        <RawDisplay data={yrtStopPrediction.data} />
      </main>
    );
  }
  if (stopQueryNum.length > 0) {
    return (
      <main className={styles["yrt-main"]}>
        <Title2>Stop {params.stopId} loading...</Title2>
      </main>
    );
  }
  return (
    <main className={styles["yrt-main"]}>
      <Title2>Stop {params.stopId} does not exist.</Title2>
      <RawDisplay data={yrtStops} />
    </main>
  );
}
