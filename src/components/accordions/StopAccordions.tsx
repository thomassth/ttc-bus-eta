import {
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Badge,
} from "@fluentui/react-components";
import { useCallback } from "react";

import { StopAccordionsParams } from "../../models/lineStop";
import { fluentStyles } from "../../styles/fluent";
import { removeSpecialChars } from "../utils/routeName";

export function StopAccordions(props: StopAccordionsParams) {
  const fluentStyle = fluentStyles();

  const StopsDetails = useCallback(() => {
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

    return <ul>{stops}</ul>;
  }, [props]);

  return (
    <AccordionItem value={props.tag}>
      <AccordionHeader className={fluentStyle.accordionHeader}>
        <Badge className={fluentStyle.badge}>{props.direction}</Badge>
        <Badge className={fluentStyle.badge}>{props.lineNum}</Badge>
        {removeSpecialChars(props.title)}
      </AccordionHeader>
      <StopsDetails />
    </AccordionItem>
  );
}
