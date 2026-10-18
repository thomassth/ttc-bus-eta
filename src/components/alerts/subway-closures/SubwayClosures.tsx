import { TZDate } from "@date-fns/tz";
import { useQuery } from "@tanstack/react-query";
import { format, parse } from "date-fns";
import { useMemo } from "react";

import { fetchSubwayClosure } from "../../fetch/queries.js";
import { SubwayClosureItem } from "./SubwayClosureItem.js";
import style from "./SubwayClosures.module.css";

export const SubwayClosures = ({ startDate }: { startDate: string }) => {
  const subwayClosureQuery = useQuery(fetchSubwayClosure(startDate));
  const currentTime = new TZDate(new Date(), "America/Toronto");
  const selectedDate = parse(startDate, "yyyy-MM-dd", new Date());
  const currentDate = useMemo(() => {
    return currentTime.toISOString().split("T")[0];
  }, [currentTime]);
  const title = useMemo(() => {
    if (startDate === currentDate) {
      return "Today's Subway Closures";
    }
    const formattedDate = format(selectedDate, "yyyy-MM-dd, EEEE");
    return `Subway Closures on ${formattedDate}`;
  }, [startDate, currentDate]);

  const getClosuresByDateMatch = (match: boolean) =>
    subwayClosureQuery.data?.filter(
      (closure) => (closure.last_shown === currentDate) === match
    ) ?? [];

  const listedSubwayClosures = useMemo(
    () => getClosuresByDateMatch(true),
    [subwayClosureQuery, currentDate]
  );

  const unlistedSubwayClosures = useMemo(
    () => getClosuresByDateMatch(false),
    [subwayClosureQuery, currentDate]
  );

  if (!subwayClosureQuery.isFetched || subwayClosureQuery.isFetching) {
    return (
      <article>
        <h2>{title}</h2>
        <p>Checking...</p>
      </article>
    );
  }
  if (subwayClosureQuery.status === "error") {
    return (
      <article>
        <h2>{title}</h2>
        <p>We don't have entry for this date.</p>
      </article>
    );
  }
  if (subwayClosureQuery.data?.length === 0 || subwayClosureQuery.isError) {
    return (
      <article>
        <h2>{title}</h2>
        <h3>No subway closures on record!</h3>
        <p>
          Source:
          <a href="https://www.ttc.ca/service-advisories/subway-service#e=0">
            TTC website
          </a>
        </p>
      </article>
    );
  }
  return (
    <article>
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
      <p>
        Source:
        <a href="https://www.ttc.ca/service-advisories/subway-service#e=0">
          TTC website
        </a>
      </p>
    </article>
  );
};
