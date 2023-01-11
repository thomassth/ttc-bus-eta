import {
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Badge,
} from "@fluentui/react-components";

import { LineStopElement } from "../../data/EtaObjects";
import { fluentStyles } from "../../styles/fluent";
import { parseRoute } from "../parser/routeName";

export function StopAccordions(props: {
  result: LineStopElement[];
  title: string;
  direction: string;
  lineNum: number;
  tag: string;
}) {
  const overrides = fluentStyles();

  const final: JSX.Element[] = [];

  for (const lineStop of props.result) {
    final.push(
      <AccordionPanel
        key={`${props.lineNum}-${props.direction}-${lineStop.key}`}
      >
        {lineStop.stopId} {lineStop.latlong} {lineStop.id} {lineStop.name}
      </AccordionPanel>
    );
  }

  return (
    <AccordionItem value={props.tag}>
      <AccordionHeader className={overrides.accordionHeader}>
        <Badge className={overrides.badge}>{props.direction}</Badge>
        <Badge className={overrides.badge}>{props.lineNum}</Badge>
        {parseRoute(props.title)}
      </AccordionHeader>
      {final}
    </AccordionItem>
  );
}
