import {
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Button,
} from "@fluentui/react-components";
import { Clock16Regular } from "@fluentui/react-icons";
import { Link } from "react-router-dom";

import { RouteBranchStops } from "../../models/ttc.js";
import { fluentStyles } from "../../styles/fluent.js";
import { TtcBadge } from "../badges.js";
import { LocationButton } from "./StopAccordions.js";
import style from "./SubwayAccordions.module.css";

const lineColors = new Map([
  [1, "yellow"],
  [2, "green"],
  [3, "blue"],
  [4, "purple"],
  [5, "orange"],
]);

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
        <AccordionPanel
          className={[
            style["subway-accordion-item"],
            style["accordion-panel"],
          ].join(" ")}
        >
          <div
            className={style["station-btn"]}
            style={{ background: lineColors.get(props.lineNum) }}
          >
            <ETAButton
              code={lineStop.code}
              line={props.lineNum}
              type={"subway"}
            />
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
              type={"subway"}
              name={lineStop.name.replace(" - ", "\n")}
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
      <ul className={style["subway-list"]}>{stops}</ul>
    </AccordionItem>
  );
}

function ETAButton(props: {
  line: number;
  code: string;
  type: string;
  name?: string;
}) {
  return (
    <Link to={`/ttc/lines/${props.line}/${props.code}`} title={"View stop ETA"}>
      <Button
        icon={props.name ? undefined : <Clock16Regular />}
        shape={props.type === "subway" && !props.name ? "circular" : "rounded"}
        appearance={props.name ? "subtle" : undefined}
      >
        {props.name}
      </Button>
    </Link>
  );
}
