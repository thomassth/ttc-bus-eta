import {
  Badge,
  Button,
  Link as LinkFluent,
  Text,
} from "@fluentui/react-components";
import { Map24Filled, VehicleBus16Filled } from "@fluentui/react-icons";
import { useCallback, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { LineStop, LineStopElement } from "../data/etaObjects";
import { RouteXml } from "../data/etaXml";
import { fluentStyles } from "../styles/fluent";
import RawDisplay from "./RawDisplay";
import { FetchXMLWithCancelToken } from "./fetchUtils";
import { StopAccordions } from "./lists/StopAccordions";
import { stopsParser } from "./parser/stopsParser";

function RouteInfo(props: { line: number }): JSX.Element {
  const [data, setData] = useState<RouteXml>();
  const [lineNum] = useState(props.line);
  const [stopDb, setStopDb] = useState<LineStop[]>([]);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<number>(Date.now());
  const { t } = useTranslation();

  const fluentStyle = fluentStyles();

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
          id: (
            <Badge className={fluentStyle.badge} appearance="outline">
              {matchingStop?.id}
            </Badge>
          ),
          key: matchingStop?.id ?? 0,
          name: `${matchingStop?.name}`,
          latlong: (
            <a
              title={t("buttons.mapPin") ?? "View location in Google Maps"}
              href={`http://maps.google.com/maps?z=12&t=m&q=loc:${matchingStop?.latlong[0]}+${matchingStop?.latlong[1]}`}
            >
              <Button icon={<Map24Filled />} />
            </a>
          ),
          stopId: (
            <Link
              to={`/stops/${matchingStop?.stopId}`}
              title={t("buttons.busIcon") ?? "View stop ETA"}
            >
              <Button icon={<VehicleBus16Filled />} />
            </Link>
          ),
        });
      }
      return result;
    },
    [stopDb]
  );

  useEffect(() => {
    const controller = new AbortController();

    const fetchStopsData = async () => {
      const { parsedData, error } = await FetchXMLWithCancelToken(
        `https://webservices.umoiq.com/service/publicXMLFeed?command=routeConfig&a=ttc&r=${lineNum}`,
        {
          signal: controller.signal,
          method: "GET",
        }
      );

      return { parsedData, error };
    };

    fetchStopsData().then(({ parsedData, error }) => {
      if (error || !parsedData) {
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
    if (data.body.Error === undefined) {
      const accordionList: JSX.Element[] = data.body.route.direction.map(
        (element) => {
          const list = createStopList(element);
          return (
            <li key={`${element.tag}`}>
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
        <div className="stopsListContainer">
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
      const errorString = data.body.Error["#text"];
      if (noRouteRegex.test(errorString)) {
        return (
          <div className="stopsListContainer">
            <Text as="h1" weight="semibold">
              <Trans>{t("lines.noLineInDb")}</Trans>
            </Text>
            <RawDisplay data={data} />
          </div>
        );
      } else
        return (
          <div className="stopsListContainer">
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
    return (
      <LinkFluent appearance="subtle" onClick={handleFetchBusClick}>
        <Text as="h1" weight="semibold">
          {t("reminder.loading")}
        </Text>
      </LinkFluent>
    );
  }
}
export default RouteInfo;
