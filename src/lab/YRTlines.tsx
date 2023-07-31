import { Card, Text } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { YRTBadge } from "../components/badges";
import { LineItem, LinesRequest } from "../models/yrt";

export default function YRTLines() {
  const [response, setResponse] = useState<LinesRequest>({});
  const [lineList, setLineList] = useState<LineItem[]>();
  useEffect(() => {
    document.title = `YRT arrivals`;
  });
  useEffect(() => {
    const controller = new AbortController();

    const fetchEtaData = async () => {
      let response = {};
      await fetch(`https://tripplanner.yrt.ca/TI_FixedRoute_Line`, {
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
    }

    return () => {
      // second
    };
  }, [response.result]);

  const lineRows = [];

  if (Array.isArray(lineList) && lineList.length)
    for (const i in lineList) {
      const item = lineList[i];
      lineRows.push(
        <li key={item.sortOrder}>
          <Card className="cardContainer clickableCard">
            <Link
              className="routeCard"
              to={`/yrt/lines/${item.lineIdContexts[0].lineId}`}
            >
              <YRTBadge color={item.colour} lineAbbr={item.sortOrder} />
              <Text>{item.name}</Text>
            </Link>
          </Card>
        </li>
      );
    }

  return (
    <article>
      <ul className="routeList">{lineRows}</ul>
    </article>
  );
}
