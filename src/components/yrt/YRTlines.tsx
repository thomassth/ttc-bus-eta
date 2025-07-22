import { Card, Text } from "@fluentui/react-components";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { Link } from "react-router";
import type { LinesRequest } from "../../models/yrt.js";
import useNavigate from "../../routes/navigate.js";
import { YRTBadge } from "../badges.js";
import { getYrtStops } from "../fetch/queries.js";
import RawDisplay from "../rawDisplay/RawDisplay.js";
import StopSearch from "../search/StopSearch.js";

export default function YRTLines() {
  const yrtLines = useQuery<LinesRequest>({
    queryKey: ["yrt-lines"],
    queryFn: async () => {
      const response = await fetch(
        "https://tripplanner.yrt.ca/TI_FixedRoute_Line",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json text/plain, */*",
          },
          body: JSON.stringify({
            version: "1.1",
            method: "GetLines",
            params: {},
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });

  const yrtStops = useQuery(getYrtStops);

  useEffect(() => {
    document.title = "YRT arrivals";
  }, []);

  const lineList = useMemo(() => {
    const response = yrtLines.data;
    if (
      response?.result &&
      response.result?.validation?.[0]?.Type !== "error"
    ) {
      return response.result?.lines;
    }
    return [];
  }, [yrtLines.data]);

  const directions = useMemo(() => {
    const response = yrtLines.data;
    const map: Map<number, string> = new Map();

    if (
      response?.result &&
      response.result?.validation?.[0]?.Type !== "error"
    ) {
      for (const item of response.result.lines) {
        for (const dir of item.directions) {
          map.set(dir.lineDirIdContext?.[0].lineDirId, dir.directionName);
        }
      }
    }
    return map;
  }, [yrtLines.data]);

  const lineRows = useMemo(() => {
    const result = [];

    for (const i in lineList) {
      const item = lineList[i];
      result.push(
        <li key={item.sortOrder}>
          <Card className="card-container clickableCard">
            <Link
              className="route-card"
              to={`/yrt/lines/${item.lineIdContexts[0].lineId}`}
              state={{
                directions,
                lineName: item.name,
                lineNum: item.sortOrder,
              }}
            >
              <YRTBadge color={item.colour} lineAbbr={item.sortOrder} />
              <Text>{item.name}</Text>
            </Link>
          </Card>
        </li>
      );
    }
    return result;
  }, [lineList]);
  const { navigate } = useNavigate();

  const onStopSearchSubmit = (input: string) => {
    const queryId = yrtStops.data?.find(
      (item) => item.stopPublicId === input
    )?.stopId;
    if (!queryId) {
      return;
    }
    navigate(`stops/${queryId}`);
  };

  return (
    <article>
      <StopSearch onValidSubmit={onStopSearchSubmit} operator="yrt" />
      <ul className="route-list">{lineRows}</ul>
      <RawDisplay data={yrtLines.data} />
    </article>
  );
}
