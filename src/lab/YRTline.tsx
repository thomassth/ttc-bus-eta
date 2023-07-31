import { Accordion } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { YRTStopAccordions } from "../components/accordions/StopAccordions";
import { LineList, LineRequest } from "../models/yrt";

export default function YRTLine() {
  const params = useParams();

  const [response, setResponse] = useState<LineRequest>({});
  const [lineList, setLineList] = useState<LineList[]>();
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
          method: "GetLineDetails",
          params: {
            lineId: params.lineId,
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
    if (response.result && response.result?.validation?.[0]?.Type !== "error") {
      setLineList(response.result.directions);
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
        <li key={i}>
          <YRTStopAccordions
            title={item.lineDirId}
            direction={"Direction"}
            lineNum={1}
            result={item.stops}
            tag={i}
          />
        </li>
      );
    }

  return (
    <article className="stopsListContainer">
      <ul>
        <Accordion collapsible>{lineRows}</Accordion>
      </ul>
    </article>
  );
}
