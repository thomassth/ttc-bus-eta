import { Badge, Button, Link, Text } from "@fluentui/react-components";
import { Map24Filled, VehicleBus16Filled } from "@fluentui/react-icons";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { fluentStyles } from "../../styles/fluent";
import RawDisplay from "../RawDisplay";
import { StopAccordions } from "../lists/StopAccordions";
import { LineStop, stopsParser } from "../parser/StopsParser";

const { XMLParser } = require("fast-xml-parser");

interface LineStopElement {
  id: JSX.Element;
  name: string;
  latlong: JSX.Element;
  stopId: JSX.Element;
}

function RouteInfo(props: { line: number }): JSX.Element {
  const [data, setData] = useState<any>();
  const [lineNum] = useState(props.line);
  const [stopDb, setStopDb] = useState<LineStop[]>([]);
  const [toggleFetch, setToggleFetch] = useState<boolean>(false);
  const { t } = useTranslation();
  const overrides = fluentStyles();

  const createStopList = useCallback(
    (json: any) => {
      const result: LineStopElement[] = [];
      json.stop.map((element: any) => {
        const matchingStop = stopDb.find(
          (searching) => parseInt(element["@_tag"]) === searching.id
        );
        result.push({
          id: (
            <Badge className={overrides.badge} appearance="outline">
              {matchingStop?.id}
            </Badge>
          ),
          name: `${matchingStop?.name}`,
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
    const controller = new AbortController();
    fetch(
      `https://webservices.umoiq.com/service/publicXMLFeed?command=routeConfig&a=ttc&r=${lineNum}`,
      {
        signal: controller.signal,
        method: "GET",
      }
    )
      .then((response) => {
        response.text().then((str) => {
          const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@_",
          });
          const dataJson = parser.parse(str);
          setData(dataJson);
          setStopDb(stopsParser(dataJson));
        });
      })
      .catch(() => {
        // no handling required ?
      });

    // when useEffect is called, the following clean-up fn will run first
    return () => {
      controller.abort();
    };
  }, [toggleFetch]);

  const handleFetchBusClick = () => {
    setToggleFetch(!toggleFetch);
    setData(null);
    setStopDb([]);
  };

  if (data) {
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
