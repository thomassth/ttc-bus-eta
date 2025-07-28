import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

import {
  fetchSubwayClosure,
  fetchSubwayClosureLastUpdated,
} from "../../fetch/queries.js";
import { SubwayClosureItem } from "./SubwayClosureItem.js";
import style from "./SubwayClosures.module.css";

export const SubwayClosures = ({ startDate }: { startDate: string }) => {
  const subwayClosureQuery = useQuery(fetchSubwayClosure(startDate));
  const currentDate =
    useQuery(fetchSubwayClosureLastUpdated).data ??
    new Date().toISOString().split("T")[0];
  const title = useMemo(() => {
    if (startDate === currentDate) {
      return "Today's Subway Closures";
    }
    return "Subway Closures";
  }, [startDate, currentDate]);

  const getClosuresByDateMatch = useCallback(
    (match: boolean) =>
      subwayClosureQuery.data?.filter(
        (closure) => (closure.last_shown === currentDate) === match
      ) ?? [],
    [subwayClosureQuery.data, currentDate]
  );

  const listedSubwayClosures = useMemo(
    () => getClosuresByDateMatch(true),
    [getClosuresByDateMatch]
  );

  const unlistedSubwayClosures = useMemo(
    () => getClosuresByDateMatch(false),
    [getClosuresByDateMatch]
  );

  if (!subwayClosureQuery.isFetched) {
    return (
      <div>
        <h2>{title}</h2>
        <p>Loading...</p>
      </div>
    );
  }
  if (subwayClosureQuery.data?.length === 0 || subwayClosureQuery.isError) {
    return null;
  }
  return (
    <div>
      <h2>{title}</h2>
      <ul className={style["subway-closures"]}>
        {listedSubwayClosures.map((closure) => {
          return <SubwayClosureItem closure={closure} key={closure.url} />;
        })}
      </ul>
      {unlistedSubwayClosures.length > 0 && (
        <details>
          <summary>Delisted entries:</summary>
          <ul className={style["subway-closures"]}>
            {unlistedSubwayClosures.map((closure) => {
              return <SubwayClosureItem closure={closure} key={closure.url} />;
            })}
          </ul>
        </details>
      )}
    </div>
  );
};
