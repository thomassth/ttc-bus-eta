import { Link as LinkFluent, Text } from "@fluentui/react-components";
import { useCallback, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import { RouteJson } from "../../models/etaJson.js";
import { LineStop, LineStopElement } from "../../models/etaObjects.js";
import { StopAccordions } from "../accordions/StopAccordions.js";
import { stopsParser } from "../parser/stopsParser.js";
import RawDisplay from "../rawDisplay/RawDisplay.js";
import { getTTCRouteData } from "./fetchUtils.js";

function RouteInfo(props: { line: number }): JSX.Element {
  const [data, setData] = useState<RouteJson>();
  const [lineNum] = useState(props.line);
  const [stopDb, setStopDb] = useState<LineStop[]>([]);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<number>(Date.now());
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
      const data = await getTTCRouteData(lineNum, {
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

  if (data !== undefined) {
    if (data.Error === undefined) {
      const accordionList: JSX.Element[] = data.route.direction.map(
        (element) => {
          const list = createStopList(element);
          return (
            <li key={element.tag}>
              <StopAccordions
                title={element.title}
                direction={element.name}
                lineNum={element.branch}
                result={list}
                tag={element.tag}
              />
            </li>
          );
        }
      );

      return (
        <div className="stop-prediction-page">
          <ul>
            {accordionList}
            <li>
              <RawDisplay data={data} />
            </li>
          </ul>
        </div>
      );
    } else {
      const noRouteRegex = /Could not get route /;
      const errorString = data.Error["#text"];
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
