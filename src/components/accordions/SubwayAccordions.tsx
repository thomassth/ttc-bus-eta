import {
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Button,
} from "@fluentui/react-components";
import { VehicleBus16Filled } from "@fluentui/react-icons";
import { Link } from "react-router-dom";

import { RouteBranchStops } from "../../models/ttc";
import { fluentStyles } from "../../styles/fluent";
import { TtcBadge } from "../badges";
import { LocationButton } from "./StopAccordions";

export function SubwayAccordions(props: {
  result: RouteBranchStops[];
  title: string;
  lineNum: number;
  tag: string;
}) {
  const fluentStyle = fluentStyles();

  const stops = props.result.map((lineStop) => {
    return (
      <li key={`${lineStop.id}`}>
        <AccordionPanel className={fluentStyle.accordionPanel}>
          <div className="lineDetails">
            <ETAButton code={lineStop.code} line={props.lineNum} />
          </div>
          <div className="lineDetails">
            <LocationButton
              latlon={{
                lat: lineStop.latitude,
                lon: lineStop.longitude,
              }}
            />
          </div>
          <div className="lineDetails">{lineStop.name}</div>
        </AccordionPanel>
      </li>
    );
  });

  return (
    <AccordionItem value={props.tag}>
      <AccordionHeader className={fluentStyle.accordionHeader}>
        <TtcBadge key={props.lineNum} lineNum={`${props.lineNum}`} />
        {props.title}
      </AccordionHeader>
      <ul>{stops}</ul>
    </AccordionItem>
  );
}

function ETAButton(props: { line: number; code: string }) {
  return (
    <Link to={`/ttc/lines/${props.line}/${props.code}`} title={"View stop ETA"}>
      <Button icon={<VehicleBus16Filled />} />
    </Link>
  );
}