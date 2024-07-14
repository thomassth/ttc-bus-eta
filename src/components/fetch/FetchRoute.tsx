import {
  Accordion,
  Link as LinkFluent,
  Tab,
  TabList,
  Text,
} from "@fluentui/react-components";
import type {
  SelectTabData,
  SelectTabEvent,
  TabValue,
} from "@fluentui/react-components";
import { useCallback, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import { RouteJson } from "../../models/etaJson.js";
import { LineStop, LineStopElement } from "../../models/etaObjects.js";
import { StopAccordions } from "../accordions/StopAccordions.js";
import { stopsParser } from "../parser/stopsParser.js";
import RawDisplay from "../rawDisplay/RawDisplay.js";
import style from "./FetchRoute.module.css";
import { getTTCRouteData } from "./fetchUtils.js";

function RouteInfo(props: { line: number }): JSX.Element {
  const [data, setData] = useState<RouteJson>();
  const [stopDb, setStopDb] = useState<LineStop[]>([]);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<number>(Date.now());
  const [enabledDir, setEnabledDir] = useState<TabValue>("");
  const { t } = useTranslation();

  const createStopList = useCallback(
    (stuff: { stop: { tag: string }[] }) => {
      const result: LineStopElement[] = [];

      for (const element of stuff.stop) {
        const matchingStop = stopDb.find(
          (searching) => parseInt(element.tag) === searching.id
        );

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
    (event: SelectTabEvent, data: SelectTabData) => setEnabledDir(data.value),
    [enabledDir]
  );

  if (data) {
    if (!data.Error) {
      const directions: Set<string> = new Set();
      data.route.direction.forEach((line) => {
        directions.add(line.name);
      });
      const accordionList: (direction: string) => JSX.Element[] = (
        direction
      ) => {
        return data.route.direction
          .filter((line) => direction === line.name)
          .map((line, index) => {
            const list = createStopList(line);

            return (
              <StopAccordions
                key={line.tag}
                index={index.toString()}
                title={line.title}
                direction={line.name}
                lineNum={line.branch}
                result={list}
                tag={line.tag}
              />
            );
          });
      };
      const directionsArr = Array.from(directions.values());
      if (enabledDir === "") setEnabledDir(directionsArr[0]);

      return (
        <div className="stop-prediction-page">
          <TabList
            defaultSelectedValue={enabledDir}
            className="directon-buttons"
            onTabSelect={handleDirClick}
          >
            {directionsArr.map((direction) => {
              return (
                <Tab key={direction} value={direction}>
                  {direction}
                </Tab>
              );
            })}
          </TabList>

          {directionsArr.map((direction) => {
            const accordionItems = accordionList(direction);
            return (
              <Accordion
                collapsible
                defaultOpenItems={accordionItems.length === 1 ? "0" : ""}
                className={enabledDir !== direction ? style.hide : undefined}
                key={direction}
              >
                {accordionItems}
              </Accordion>
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
