import {
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Badge,
} from "@fluentui/react-components";

import { fluentStyles } from "../../styles/fluent";
import { LineStop } from "../parser/StopsParser";
import { parseRoute } from "../parser/routeName";

export const StopAccordions = (props: any) => {
  const overrides = fluentStyles();

  const final: JSX.Element[] = [];
  props.result.map((lineStop: LineStop, index: number) => {
    final.push(
      <AccordionPanel key={`${index}`}>
        {lineStop.stopId} {lineStop.latlong} {lineStop.id} {lineStop.name}
      </AccordionPanel>
    );
    return lineStop;
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
