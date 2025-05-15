import {
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Button,
} from "@fluentui/react-components";
import { VehicleBus16Filled } from "@fluentui/react-icons";
import { Link } from "react-router-dom";

import type { RouteBranchStops } from "../../models/ttc.js";
import { fluentStyles } from "../../styles/fluent.js";
import { TtcBadge } from "../badges.js";
import { LocationButton } from "./StopAccordions.js";
import style from "./StopAccordions.module.css";

export function SubwayAccordions(props: {
  result: RouteBranchStops[];
  title: string;
  lineNum: number;
  tag: string;
}) {
  const fluentStyle = fluentStyles();

  const stops = props.result.map((lineStop) => {
    return (
      <li key={lineStop.id.toString()}>
        <AccordionPanel className={style["accordion-panel"]}>
          <div className="line-details">
            <ETAButton code={lineStop.code} line={props.lineNum} />
          </div>
          <div className="line-details">
            <LocationButton
              latlon={{
                lat: lineStop.latitude,
                lon: lineStop.longitude,
              }}
            />
          </div>
          <div className="line-details">
            <ETAButton
              code={lineStop.code}
              line={props.lineNum}
              name={lineStop.name}
            />
          </div>
        </AccordionPanel>
      </li>
    );
  });

  return (
    <AccordionItem value={props.tag}>
      <AccordionHeader className={fluentStyle.accordionHeader}>
        <TtcBadge key={props.lineNum} lineNum={props.lineNum.toString()} />
        {props.title}
      </AccordionHeader>
      <ul>{stops}</ul>
    </AccordionItem>
  );
}

function ETAButton(props: { line: number; code: string; name?: string }) {
  return (
    <Link
      to={`/ttc/lines/${props.line}/${props.code}`}
      title={props.name ? props.name : "View stop ETA"}
    >
      <Button
        icon={props.name ? undefined : <VehicleBus16Filled />}
        appearance={props.name ? "subtle" : "outline"}
      >
        {props.name?.replace(" - ", "\n")}
      </Button>
    </Link>
  );
}
