import { Badge, Card, Text } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { RoutesXml } from "../../models/etaXml";
import RawDisplay from "../rawDisplay/RawDisplay";
import { FetchXMLWithCancelToken } from "./fetchUtils";
import { badgeColor } from "../badges";

const parseRouteTitle = (input: string) => {
  const routeTitleRegex = /\d+-/;
  if (routeTitleRegex.test(input)) {
    return input.replace(routeTitleRegex, "");
  } else {
    return input;
  }
};

export function RoutesInfo() {
  const [routeXmlData, setRouteXmlData] = useState<RoutesXml>();
  const [routesDb, setRoutesDb] = useState<{ tag: number; title: string }[]>(
    []
  );

  useEffect(() => {
    const controller = new AbortController();

    const fetchEtaData = async () => {
      const { parsedData, error } = await FetchXMLWithCancelToken(
        `https://webservices.umoiq.com/service/publicXMLFeed?command=routeList&a=ttc`,
        {
          signal: controller.signal,
          method: "GET",
        }
      );

      return { parsedData, error };
    };

    fetchEtaData().then(({ parsedData, error }) => {
      if (error || !parsedData) {
        return;
      }

      setRouteXmlData(parsedData);
      if (parsedData.body.route.length > 0) {
        setRoutesDb(parsedData.body.route);
      }
    });

    // when useEffect is called, the following clean-up fn will run first
    return () => {
      controller.abort();
    };
  }, []);

  const routesCards = routesDb.map((routeItem) => {
    return (
      <li key={routeItem.tag}>
        <Card className="cardContainer clickableCard">
          <Link className="routeCard" to={`/lines/${routeItem.tag}`}>
            <Badge color={badgeColor(`${routeItem.tag}`)}>{routeItem.tag}</Badge>
            <Text>{parseRouteTitle(routeItem.title)}</Text>
          </Link>
        </Card>
      </li>
    );
  });

  return (
    <article>
      <ul className="routeList">{routesCards}</ul>
      {routeXmlData !== undefined && <RawDisplay data={routeXmlData} />}
    </article>
  );
}
