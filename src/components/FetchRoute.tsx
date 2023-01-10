import { Badge, Button, Link, Text } from "@fluentui/react-components";
import { Map24Filled, VehicleBus16Filled } from "@fluentui/react-icons";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { LineStop, LineStopElement } from "../data/EtaObjects";
import { RouteXml } from "../data/EtaXml";
import { fluentStyles } from "../styles/fluent";
import { FetchXMLWithCancelToken } from "./FetchUtils";
import RawDisplay from "./RawDisplay";
import { StopAccordions } from "./lists/StopAccordions";
import { stopsParser } from "./parser/StopsParser";

function RouteInfo(props: { line: number }): JSX.Element {
  const [data, setData] = useState<RouteXml>();
  const [lineNum] = useState(props.line);
  const [stopDb, setStopDb] = useState<LineStop[]>([]);
  const [toggleFetch, setToggleFetch] = useState<boolean>(false);
  const { t } = useTranslation();

  const overrides = fluentStyles();

  const createStopList = useCallback(
    (stuff: { stop: { tag: string }[] }) => {
      const result: LineStopElement[] = [];
      stuff.stop.map((element: { tag: string }) => {
        const matchingStop = stopDb.find(
          (searching) => parseInt(element.tag) === searching.id
        );
        result.push({
          id: (
            <Badge className={overrides.badge} appearance="outline">
              {matchingStop?.id}
            </Badge>
          ),
          key: matchingStop?.id ?? 0,
          name: `${matchingStop?.name}`,
          latlong: (
            <Link
              // menuProps={menuProps}
              title={t("buttons.mapPin") ?? "View location in Google Maps"}
              href={`http://maps.google.com/maps?z=12&t=m&q=loc:${matchingStop?.latlong[0]}+${matchingStop?.latlong[1]}`}
              // disabled={disabled}
              // checked={checked}
            >
              <Button icon={<Map24Filled />} />
            </Link>
          ),
          stopId: (
            <Link
              href={`../stops/${matchingStop?.stopId}`}
              title={t("buttons.busIcon") ?? "View stop ETA"}
            >
              <Button icon={<VehicleBus16Filled />} />
            </Link>
          ),
        });
        return element;
      });
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
  }, [toggleFetch]);

  function handleFetchBusClick() {
    setToggleFetch(!toggleFetch);
    setData(undefined);
    setStopDb([]);
  }

  if (data !== undefined) {
    if (data.body.Error === undefined) {
      return (
        <div className="directionList list">
          {data.body.route.direction.map(
            (element: {
              title: string;
              name: string;
              branch: number;
              stop: { tag: string }[];
            }) => {
              const list = createStopList(element);
              return (
                <StopAccordions
                  title={element.title}
                  direction={element.name}
                  lineNum={element.branch}
                  result={list}
                  key={`${element.branch}-${element.name}`}
                />
              );
            }
          )}
          <RawDisplay data={data} />
        </div>
      );
    } else {
      // if(data.body.Error !== undefined)
      return (
        <div>
          <Link onClick={handleFetchBusClick}>
            <Text as="h1" weight="semibold">
              {`Error: ${data.body.Error["#text"]}`}
            </Text>
          </Link>
          <RawDisplay data={data} />
        </div>
      );
    }
  } else {
    return (
      <Link appearance="subtle" onClick={handleFetchBusClick}>
        <Text as="h1" weight="semibold">
          {t("reminder.loading")}
        </Text>
      </Link>
    );
  }
}
export default RouteInfo;
