import { Card, Text } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { YRTBadge } from "../components/badges.js";
import type { LineItem, LinesRequest } from "../models/yrt.js";

export default function YRTLines() {
  const [response, setResponse] = useState<LinesRequest>({});
  const [lineList, setLineList] = useState<LineItem[]>();
  const [directions, setDirections] = useState<Map<number, string>>(new Map());

  useEffect(() => {
    document.title = "YRT arrivals";
  });
  useEffect(() => {
    const controller = new AbortController();

    const fetchEtaData = async () => {
      let response = {};
      await fetch("https://tripplanner.yrt.ca/TI_FixedRoute_Line", {
        signal: controller.signal,
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
    if (response.result && response.result?.validation?.[0]?.Type !== "error") {
      setLineList(response.result?.lines);
      for (const item of response.result.lines) {
        for (const dir of item.directions) {
          directions.set(
            dir.lineDirIdContext?.[0].lineDirId,
            dir.directionName
          );
        }
      }
      setDirections(directions);
    }

    return () => {
      // second
    };
  }, [response.result]);

  const lineRows = [];

  if (Array.isArray(lineList) && lineList.length) {
    for (const i in lineList) {
      const item = lineList[i];
      lineRows.push(
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
  }

  return (
    <article>
      <ul className="route-list">{lineRows}</ul>
    </article>
  );
}
