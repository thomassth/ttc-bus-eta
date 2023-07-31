import {
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Badge,
  Button,
} from "@fluentui/react-components";
import { Map24Filled, VehicleBus16Filled } from "@fluentui/react-icons";
import { Link } from "react-router-dom";

import { LineStopElement } from "../../models/etaObjects";
import { YRTStop } from "../../models/yrt";
import { fluentStyles } from "../../styles/fluent";
import { TtcBadge } from "../badges";
import { parseRoute } from "../parser/routeName";

export function StopAccordions(props: {
  result: LineStopElement[];
  title: string;
  direction: string;
  lineNum: number;
  tag: string;
}) {
  const fluentStyle = fluentStyles();

  const stops = props.result.map((lineStop) => {
    return (
      <li key={`${props.lineNum}-${props.direction}-${lineStop.key}`}>
        <AccordionPanel className={fluentStyle.accordionPanel}>
          <div className="lineDetails">{lineStop.stopId} </div>
          <div className="lineDetails">{lineStop.latlong} </div>
          <div className="lineDetails">{lineStop.name}</div>
        </AccordionPanel>
      </li>
    );
  });

  return (
    <AccordionItem value={props.tag}>
      <AccordionHeader className={fluentStyle.accordionHeader}>
        <Badge className={fluentStyle.badge}>{props.direction}</Badge>
        <TtcBadge key={props.lineNum} lineNum={`${props.lineNum}`} />
        {parseRoute(props.title)}
      </AccordionHeader>
      <ul>{stops}</ul>
    </AccordionItem>
  );
}

export function YRTStopAccordions(props: {
  result: YRTStop[];
  title: string;
  direction: string;
  lineNum: number;
  tag: string;
}) {
  const fluentStyle = fluentStyles();

  const stops = props.result.map((lineStop) => {
    return (
      <AccordionPanel
        className={fluentStyle.accordionPanel}
        key={`${props.lineNum}-${props.direction}-${lineStop.stopId}`}
      >
        <div className="lineDetails">
          <ETAButton stopId={lineStop.stopId} />
        </div>
        <div className="lineDetails">
          <LocationButton latlon={lineStop.coordinate} />
        </div>
        <div className="lineDetails">{lineStop.name}</div>
      </AccordionPanel>
    );
  });

  return (
    <AccordionItem value={props.tag}>
      <AccordionHeader>{props.title}</AccordionHeader>
      {stops}
    </AccordionItem>
  );
}

export function ETAButton(props: { stopId: number }) {
  return (
    <Link to={`/yrt/stops/${props.stopId}`} title={"View stop ETA"}>
      <Button icon={<VehicleBus16Filled />} />
    </Link>
  );
}

export function LocationButton(props: {
  latlon: { lat: number; lon: number };
}) {
  return (
    <a
      title={"View location in Google Maps"}
      href={`http://maps.google.com/maps?z=12&t=m&q=loc:${props.latlon.lat}+${props.latlon.lon}`}
    >
      <Button icon={<Map24Filled />} />
    </a>
  );
}
