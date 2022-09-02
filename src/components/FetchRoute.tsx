import {
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Badge,
  Button,
  Link,
  Text,
} from "@fluentui/react-components";
import { useCallback, useEffect, useState } from "react";
import { Map24Filled, VehicleBus16Filled } from "@fluentui/react-icons";
const { XMLParser } = require("fast-xml-parser");

function RouteInfo(props: any): JSX.Element {
  const [data, setData] = useState<any>();
  const [lineNum] = useState(props.line);
  const [stopDb, setStopDb] = useState<
    { id: any; name: any; latlong: any[]; stopId: any }[]
  >([]);

  const fetchBus = (line: any = lineNum) => {
    fetch(
      `https://webservices.umoiq.com/service/publicXMLFeed?command=routeConfig&a=ttc&r=${line}`,
      {
        method: "GET",
      }
    ).then((response) => {
      response.text().then((str) => {
        const parser = new XMLParser({
          ignoreAttributes: false,
          attributeNamePrefix: "@_",
        });
        const dataJson = parser.parse(str);
        setData(dataJson);
        setStopDb(createStopDb(dataJson));
      });
    });
  };

  const StopAccordions = (props: any) => {
    const final: JSX.Element[] = [];
    props.result.map((element: any, index: number) => {
      final.push(
        <AccordionPanel key={`${index}`}>
          {element.stopId} {element.latlong} {element.id} {element.name}
        </AccordionPanel>
      );
      return element;
    });
    return (
      <AccordionItem value={props.title}>
        <AccordionHeader>
          <Badge>{props.direction}</Badge>
          <Badge>{props.lineNum}</Badge>
          {props.title}
        </AccordionHeader>
        {final}
      </AccordionItem>
    );
  };

  const createStopList = useCallback(
    (json: any) => {
      const result: {
        id: any;
        name: any;
        latlong: any | undefined;
        stopId: any;
      }[] = [];
      json.stop.map((element: any, index: number) => {
        const matchingStop = stopDb.find(
          (searching) => parseInt(element["@_tag"]) === parseInt(searching.id)
        );
        result.push({
          id: <Badge appearance="outline">{matchingStop?.id}</Badge>,
          name: matchingStop?.name,
          latlong: (
            <Link
              // menuProps={menuProps}
              title="MapPin"
              aria-label="Emoji"
              href={`http://maps.google.com/maps?z=12&t=m&q=loc:${matchingStop?.latlong[0]}+${matchingStop?.latlong[1]}`}
              // disabled={disabled}
              // checked={checked}
            >
              <Button icon={<Map24Filled />} />
            </Link>
          ),
          stopId: (
            <Link href={`../stops/${matchingStop?.stopId}`}>
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
    fetchBus();
  }, []);

  function fetchBusClick(): void {
    fetchBus();
  }

  if (data != null) {
    if (data.body.Error === undefined) {
      return (
        <div className="directionList list">
          {data.body.route.direction.map((element: any, index: number) => {
            const list = createStopList(element);
            return (
              <StopAccordions
                title={element["@_title"]}
                direction={element["@_name"]}
                lineNum={element["@_branch"]}
                result={list}
                key={`sa-${index}`}
              />
            );
          })}
        </div>
      );
    } else {
      // if(data.body.Error !== undefined)
      return (
        <div onClick={fetchBusClick}>
          <Text as="h1" weight="semibold">
            Cannot locate this route.
          </Text>
        </div>
      );
    }
  } else {
    return (
      <div onClick={fetchBusClick}>
        <Text as="h1" weight="semibold">
          loading...
        </Text>
      </div>
    );
  }
}
export default RouteInfo;

function createStopDb(
  json: any
): { id: any; name: any; latlong: any[]; stopId: any }[] {
  const result: { id: any; name: any; latlong: any[]; stopId: any }[] = [];
  json.body.route.stop.map((element: any) => {
    if (element["@_stopId"] === undefined) {
      console.log(element);
    } else {
      result.push({
        id: element["@_tag"],
        name: element["@_title"],
        latlong: [element["@_lat"], element["@_lon"]],
        stopId: element["@_stopId"],
      });
    }
    return element;
  });
  return result;
}
