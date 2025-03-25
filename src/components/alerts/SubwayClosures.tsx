import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { SubwayClosureJson } from "../../models/etaJson.js";
import { fetchSubwayClosure } from "../fetch/queries.js";

export const SubwayClosures = ({ startDate }: { startDate: string }) => {
  const subwayClosureQuery = useQuery<SubwayClosureJson[], Error>(
    fetchSubwayClosure(startDate)
  );
  const currentDate = new Date().toISOString().split("T")[0];
  const title = useMemo(() => {
    if (startDate === currentDate) {
      return "Today's Subway Closures";
    }
    return "Subway Closures";
  }, [startDate, currentDate]);
  if (subwayClosureQuery.data?.length === 0) {
    return null;
  }
  return (
    <div>
      <h2>{title}</h2>
      {subwayClosureQuery.data?.map((closure) => {
        return (
          <div key={closure.url}>
            <h3>{closure.line}</h3>
            <p>{closure.text}</p>
          </div>
        );
      })}
    </div>
  );
};
