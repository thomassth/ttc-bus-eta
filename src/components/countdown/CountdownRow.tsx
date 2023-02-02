import { Badge } from "@fluentui/react-components";
import { Link } from "react-router-dom";

import { EtaBusWithID } from "../../data/etaObjects";
import { fluentStyles } from "../../styles/fluent";
import { CountdownSec } from "./CountdownSec";

function CountdownBranch(props: { branch: string }) {
  const fluentStyle = fluentStyles();

  return (
    <Badge className={fluentStyle.badge} appearance="outline">
      {props.branch}
    </Badge>
  );
}

export function CountdownRow(props: { item: EtaBusWithID }) {
  return (
    <div className="countdownRow">
      <Link to={`/lines/${props.item.branch}`}>
        <CountdownBranch branch={props.item.branch} />
      </Link>
      <CountdownSec
        second={props.item.seconds}
        epochTime={props.item.epochTime}
      />
    </div>
  );
}
