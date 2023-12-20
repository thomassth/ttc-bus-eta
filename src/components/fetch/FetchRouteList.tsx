import { Card, Link as LinkFluent, Text } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { RoutesXml } from "../../models/etaXml";
import { TtcBadge } from "../badges";
import RawDisplay from "../rawDisplay/RawDisplay";
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
  const [routeXmlData, setRouteXmlData] = useState<RoutesXml>();
  const [routesDb, setRoutesDb] = useState<{ tag: number; title: string }[]>(
    []
  );

  useEffect(() => {
    const controller = new AbortController();

    const fetchEtaData = async () => {
      const { parsedData, error } = await FetchXMLWithCancelToken(
        "https://webservices.umoiq.com/service/publicXMLFeed?command=routeList&a=ttc",
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
      <li key={routeItem.tag} id={routeItem.tag.toString()}>
        <Card className="cardContainer clickableCard">
          <Link className="routeCard" to={`/lines/${routeItem.tag}`}>
            <TtcBadge key={routeItem.tag} lineNum={`${routeItem.tag}`} />
            <Text>{parseRouteTitle(routeItem.title)}</Text>
          </Link>
        </Card>
      </li>
    );
  });

  return (
    <article>
      {/* <ul className="jumpbar">
        <li>
          <a href="#200">
            <LinkFluent><Button>
              Seasonal</Button></LinkFluent>
          </a>
        </li>
        <li><a href="#300"><LinkFluent><Button>Night</Button></LinkFluent></a></li>
        <li><a href="#300"><LinkFluent><Button>Community</Button></LinkFluent></a></li>
        <li><a href="#501"><LinkFluent><Button>Streetcar</Button></LinkFluent></a></li>
        <li><a href="#900"><LinkFluent><Button>Express</Button></LinkFluent></a></li>
      </ul> */}
      <JumpBar />
      <ul className="routeList">
        {subwayCards()}
        {routesCards}
      </ul>
      {routeXmlData !== undefined && <RawDisplay data={routeXmlData} />}
    </article>
  );
}

function subwayCards() {
  const subwayLines = [
    { line: 1, name: "Yonge-University" },
    { line: 2, name: "Bloor-Danforth" },
    { line: 4, name: "Sheppard" },
  ];

  const result = subwayLines.map((subwayLine, index) => {
    return (
      <li key={subwayLine.line}>
        <Card className="cardContainer clickableCard">
          <Link className="routeCard" to={`/lines/${subwayLine.line}`}>
            <TtcBadge
              key={subwayLine.line}
              lineNum={subwayLine.line.toString()}
            />
            <Text>{parseRouteTitle(subwayLine.name)}</Text>
          </Link>
        </Card>
      </li>
    );
  });
  return result;
}

function JumpBar() {
  const jumpbarMap = [
    ["", "Regular"],
    [200, "Seasonal"],
    [300, "Night"],
    [501, "Streetcar"],
    [900, "Express"],
  ];

  const jumpbarItems = [];
  for (let index = 0; index < jumpbarMap.length; index++) {
    jumpbarItems.push(
      <li key={index}>
        <a href={`#${jumpbarMap[index][0]}`}>
          <LinkFluent>{jumpbarMap[index][1]}</LinkFluent>
        </a>
      </li>
    );
  }
  return <ul className="jumpbar">{jumpbarItems}</ul>;
}
