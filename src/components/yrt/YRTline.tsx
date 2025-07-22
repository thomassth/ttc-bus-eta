import { Accordion, Title2 } from "@fluentui/react-components";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router";
import type { LineRequest } from "../../models/yrt.js";
import { YRTStopAccordions } from "../accordions/StopAccordions.js";
import { YRTBadge } from "../badges.js";
import RawDisplay from "../rawDisplay/RawDisplay.js";

export default function YRTLine() {
  const params = useParams();

  const { state } = useLocation();
  const { directions, lineName, lineNum } = state;
  const translateDirId = (dirId: number) => {
    console.log(dirId);
    return directions.get(dirId);
  };
  useEffect(() => {
    document.title = "YRT arrivals";
  }, []);

  const yrtLineStops = useQuery<LineRequest>({
    queryKey: [`yrt-line-id-${params.lineId}`],
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
            method: "GetLineDetails",
            params: {
              lineId: params.lineId,
            },
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });

  const lineList = useMemo(() => {
    const response = yrtLineStops.data;
    if (
      response?.result &&
      response.result?.validation?.[0]?.Type !== "error"
    ) {
      return response.result.directions;
    }
    return [];
  }, [yrtLineStops.data]);

  const lineRows = useMemo(() => {
    const result = [];
    for (const i in lineList) {
      const item = lineList[i];
      result.push(
        <li key={i}>
          <YRTStopAccordions
            title={translateDirId(item.lineDirId)}
            direction={translateDirId(item.lineDirId)}
            lineNum={1}
            result={item.stops}
            tag={i}
          />
        </li>
      );
    }
    return result;
  }, [lineList]);

  return (
    <article className="stop-prediction-page">
      <Title2 className="line-title">
        <YRTBadge lineAbbr={lineNum} />
        {lineName}
      </Title2>
      <ul>
        <Accordion collapsible>{lineRows}</Accordion>
      </ul>
      <RawDisplay data={yrtLineStops.data} />
    </article>
  );
}
