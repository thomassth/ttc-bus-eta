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
    return lineList.map((item, i) => {
      const direction = directions.get(item.lineDirId);

      return (
        <li key={direction}>
          <YRTStopAccordions
            title={direction}
            direction={direction}
            lineNum={1}
            result={item.stops}
            tag={i.toString()}
          />
        </li>
      );
    });
  }, [lineList, directions.get]);

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
