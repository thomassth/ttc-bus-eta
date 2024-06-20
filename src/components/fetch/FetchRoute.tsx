import { Button, Link as LinkFluent, Text } from "@fluentui/react-components";
import React, { useCallback, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import { RouteJson } from "../../models/etaJson.js";
import { LineStop, LineStopElement } from "../../models/etaObjects.js";
import { StopAccordions, StopDiv } from "../accordions/StopAccordions.js";
import { stopsParser } from "../parser/stopsParser.js";
import { mergeAndGroup } from "../parser/stopsUnifier.js";
import RawDisplay from "../rawDisplay/RawDisplay.js";
import style from "./FetchRoute.module.css";
import { getTTCRouteData } from "./fetchUtils.js";

function RouteInfo(props: { line: number }): JSX.Element {
  const [data, setData] = useState<RouteJson>();
  const [stopDb, setStopDb] = useState<LineStop[]>([]);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<number>(Date.now());
  const [enabledDir, setEnabledDir] = useState<string>("");
  const { t } = useTranslation();
  const getMatchingStop = (stopNumber: number) => {
    return stopDb.find((searching) => stopNumber === searching.id);
  };
  const createStopList = useCallback(
    (stuff: { stop: { tag: string }[] }) => {
      const result: LineStopElement[] = [];

      for (const element of stuff.stop) {
        const matchingStop = getMatchingStop(parseInt(element.tag));

        // skip not found data
        if (!matchingStop) {
          continue;
        }

        result.push({
          ...matchingStop,
          key: matchingStop?.id ?? 0,
        });
      }
      return result;
    },
    [stopDb]
  );

  useEffect(() => {
    const controller = new AbortController();

    const fetchStopsData = async () => {
      const data = await getTTCRouteData(props.line, {
        signal: controller.signal,
      });

      return { parsedData: data };
    };

    fetchStopsData().then(({ parsedData }) => {
      if (!parsedData) {
        return;
      }
      setData(parsedData);
      setStopDb(stopsParser(parsedData));
    });

    // when useEffect is called, the following clean-up fn will run first
    return () => {
      controller.abort();
    };
  }, [lastUpdatedAt]);

  const handleFetchBusClick = useCallback(() => {
    setLastUpdatedAt(Date.now());
    setData(undefined);
    setStopDb([]);
  }, [lastUpdatedAt]);

  const handleDirClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setEnabledDir(event.target?.value);
    },
    [enabledDir]
  );

  const unifiedRouteView = true;

  if (data) {
    if (!data.Error) {
      const directions: Set<string> = new Set();
      data.route.direction.forEach((line) => {
        directions.add(line.name);
      });
      const accordionList: (
        direction: string
      ) => (JSX.Element | JSX.Element[])[] = (direction) => {
        if (unifiedRouteView) {
          const lines = data.route.direction.filter(
            (line) => direction === line.name
          );
          const unifiedList = lines.map((line) =>
            line.stop.map((stop) => parseInt(stop.tag))
          );

          const mergedList = mergeAndGroup(...unifiedList);

          return mergedList.map((item) => {
            if (Array.isArray(item)) {
              const matchingStops = item.map((stops) =>
                stops.map((stop) => getMatchingStop(stop))
              );

              return matchingStops.map((lines) => {
                const parsedLines: LineStopElement[] = lines
                  .filter((line) => Boolean(line))
                  .map((line: LineStop) => {
                    return { ...line, key: line.id };
                  });

                return (
                  <StopAccordions
                    key={parsedLines.toString()}
                    result={parsedLines}
                    title={`Only some buses go to these ${parsedLines.length} stops.`}
                    lineNum={props.line}
                    tag={parsedLines.toString()}
                  />
                );
              });
            }
            const matchingStop = getMatchingStop(item);
            if (matchingStop)
              return (
                <div key="test" className={style.stop}>
                  <StopDiv
                    lineStop={{ ...matchingStop, key: matchingStop.id }}
                  />
                </div>
              );
            return <div key="test">{item}</div>;
          });
        }
        return data.route.direction
          .filter((line) => direction === line.name)
          .map((line) => {
            const list = createStopList(line);

            return (
              <li key={line.tag}>
                <StopAccordions
                  title={line.title}
                  direction={line.name}
                  lineNum={line.branch}
                  result={list}
                  tag={line.tag}
                />
              </li>
            );
          });
      };
      const directionsArr = Array.from(directions.values());
      if (enabledDir === "") setEnabledDir(directionsArr[0]);

      return (
        <div className="stop-prediction-page">
          <div className={style["directon-buttons"]}>
            {directionsArr.map((direction) => {
              return (
                <Button
                  appearance={
                    enabledDir === direction ? "primary" : "secondary"
                  }
                  onClick={handleDirClick}
                  key={direction}
                  value={direction}
                >
                  {direction}
                </Button>
              );
            })}
          </div>

          {directionsArr.map((direction) => {
            return (
              <ul
                className={enabledDir !== direction ? style.hide : undefined}
                key={direction}
              >
                {accordionList(direction)}
              </ul>
            );
          })}
          <RawDisplay data={data} />
        </div>
      );
    } else {
      const noRouteRegex = /Could not get route /;
      const errorString = data.Error?.["#text"];
      if (noRouteRegex.test(errorString)) {
        return (
          <div className="stop-prediction-page">
            <Text as="h1" weight="semibold">
              <Trans>{t("lines.noLineInDb")}</Trans>
            </Text>
            <RawDisplay data={data} />
          </div>
        );
      } else
        return (
          <div className="stop-prediction-page">
            <LinkFluent onClick={handleFetchBusClick}>
              <Text as="h1" weight="semibold">
                {`Error: ${errorString}`}
              </Text>
            </LinkFluent>
            <RawDisplay data={data} />
          </div>
        );
    }
  } else {
    if (navigator.onLine) {
      return (
        <LinkFluent appearance="subtle" onClick={handleFetchBusClick}>
          <Text as="h1" weight="semibold">
            {t("reminder.loading")}
          </Text>
        </LinkFluent>
      );
    } else {
      return (
        <Text>
          Your device seems to be offline, and no cache has been found.
        </Text>
      );
    }
  }
}
export default RouteInfo;
