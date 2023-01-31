import { Badge, Text } from "@fluentui/react-components";
import { Card } from "@fluentui/react-components/unstable";
import { useState } from "react";
import { Link } from "react-router-dom";

import { FetchXMLWithCancelToken } from "./fetchUtils";

const parseRouteTitle = (input: string) => {
  const routeTitleRegex = /\d+-/;
  if (routeTitleRegex.test(input)) {
    return input.replace(routeTitleRegex, "");
  } else {
    return input;
  }
};

export function RoutesInfo() {
  const controller = new AbortController();
  const [, setData] = useState();
  const [routesDb, setRoutesDb] = useState<{ tag: number; title: string }[]>(
    []
  );

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
    console.log(parsedData);

    setData(parsedData);
    if (parsedData.body.route.length > 0) {
      setRoutesDb(parsedData.body.route);
    }
    console.log(routesDb);
  });

  const routesCards = routesDb.map((routeItem) => {
    return (
      <li key={routeItem.tag}>
        <Card className="cardContainer">
          <Link className="routeCard" to={`/lines/${routeItem.tag}`}>
            <Badge>{routeItem.tag}</Badge>
            <Text>{parseRouteTitle(routeItem.title)}</Text>
          </Link>
        </Card>
      </li>
    );
  });

  return <ul>{routesCards}</ul>;
}
