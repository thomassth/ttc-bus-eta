import {
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Badge,
  Button,
} from "@fluentui/react-components";
import { Map24Filled, VehicleBus16Filled } from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { LineStopElement } from "../../models/etaObjects.js";
import { YRTStop } from "../../models/yrt.js";
import { fluentStyles } from "../../styles/fluent.js";
import { TtcBadge } from "../badges.js";
import { parseRoute } from "../parser/routeName.js";
import style from "./StopAccordions.module.css";

export function StopAccordions(props: {
  result: LineStopElement[];
  title: string;
  direction?: string;
  lineNum: number;
  tag: string;
}) {
  const fluentStyle = fluentStyles();

  const stops = props.result.map((lineStop) => {
    return (
      <li key={`${props.lineNum}-${props.direction}-${lineStop.key}`}>
        <AccordionPanel className={style["accordion-panel"]}>
          <StopDiv lineStop={lineStop} />
        </AccordionPanel>
      </li>
    );
  });

  return (
    <AccordionItem value={props.tag}>
      <AccordionHeader className={fluentStyle.accordionHeader}>
        {props.direction && (
          <Badge className={style["direction-badge"]}>{props.direction}</Badge>
        )}
        <TtcBadge key={props.lineNum} lineNum={props.lineNum.toString()} />
        {parseRoute(props.title).name}
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
  const stops = props.result.map((lineStop) => {
    return (
      <AccordionPanel
        className={style["accordion-panel"]}
        key={`${props.lineNum}-${props.direction}-${lineStop.stopId}`}
      >
        <div className="line-details">
          <LocationButton latlon={lineStop.coordinate} />
        </div>
        <div className="line-details expand">
          <ETAButton
            stopId={lineStop.stopId}
            name={lineStop.name}
            operator="YRT"
          />
          {lineStop.name}
        </div>
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

export function StopDiv({ lineStop }: { lineStop: LineStopElement }) {
  return (
    <>
      <div className="line-details">
        <ETAButton stopId={lineStop.stopId} operator="TTC" />
      </div>
      <div className="line-details">
        <LocationButton
          latlon={{
            lat: lineStop.latlong[0],
            lon: lineStop.latlong[1],
          }}
        />
      </div>
      <div className="line-details expand">
        <ETAButton
          stopId={lineStop.stopId}
          name={lineStop.name}
          operator="TTC"
        />
      </div>
    </>
  );
}

export function ETAButton(props: {
  stopId: number;
  name?: string;
  operator: string;
}) {
  const { t } = useTranslation();

  const operatorLink = new Map([
    ["YRT", "/yrt/stops/"],
    ["TTC", "/stops/"],
  ]);

  const link = `${operatorLink.get(props.operator || "TTC")}${props.stopId}`;

  return (
    <Link
      to={link}
      title={props.name ? props.name : t("buttons.busIcon") ?? "View stop ETA"}
    >
      <Button
        icon={props.name ? undefined : <VehicleBus16Filled />}
        appearance={props.name ? "subtle" : "outline"}
      >
        {props.name?.replace("At", "\nAt")}
      </Button>
    </Link>
  );
}

export function LocationButton(props: {
  latlon: { lat: number; lon: number };
}) {
  const { t } = useTranslation();

  return (
    <a
      title={t("buttons.mapPin") ?? "View location in Google Maps"}
      href={`http://maps.google.com/maps?z=12&t=m&q=loc:${props.latlon.lat}+${props.latlon.lon}`}
    >
      <Button icon={<Map24Filled />} />
    </a>
  );
}
