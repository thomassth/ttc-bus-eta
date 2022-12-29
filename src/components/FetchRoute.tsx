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
import { parseRoute } from "./parser/routeName";
import { stopsParser } from "./parser/StopsParser";
import RawDisplay from "./RawDisplay";
import { fluentStyles } from "../styles/fluent";
const { XMLParser } = require("fast-xml-parser");

function RouteInfo(props: any): JSX.Element {
  const [data, setData] = useState<any>();
  const [lineNum] = useState(props.line);
  const [stopDb, setStopDb] = useState<
    { id: any; name: any; latlong: any[]; stopId: any }[]
  >([]);

  const overrides = fluentStyles();

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
        setStopDb(stopsParser(dataJson));
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
        <AccordionHeader className={overrides.accordionHeader}>
          <Badge className={overrides.badge}>{props.direction}</Badge>
          <Badge className={overrides.badge}>{props.lineNum}</Badge>
          {parseRoute(props.title)}
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
          id: (
            <Badge className={overrides.badge} appearance="outline">
              {matchingStop?.id}
            </Badge>
          ),
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
          <RawDisplay data={data}></RawDisplay>
        </div>
      );
    } else {
      // if(data.body.Error !== undefined)
      return (
        <div>
          <Link onClick={fetchBusClick}>
            <Text as="h1" weight="semibold">
              {`Error: ${data.body.Error["#text"]}`}
            </Text>
          </Link>
          <RawDisplay data={data}></RawDisplay>
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
