import { Badge, Link, Text, Title2 } from "@fluentui/react-components";

import { LineStopEta } from "../../data/EtaObjects";
import { fluentStyles } from "../../styles/fluent";
import { CountdownSec } from "./CountdownSec";

export default function CountdownGroup(props: { detail: LineStopEta }) {
  return (
    <div className="line">
      <Title2>
        {props.detail.etas.length === 0 ? (
          props.detail.line
        ) : (
          <Link href={`../lines/${props.detail.line}`}>
            {props.detail.line}
          </Link>
        )}
      </Title2>
      <Text>{props.detail.routeName}</Text>
      {props.detail.etas.map((el2) => (
        <div className="countdown-row" key={el2.tripTag}>
          <CountdownBranch branch={el2.branch} />
          <CountdownSec second={el2.seconds} epochTime={el2.epochTime} />
        </div>
      ))}
    </div>
  );
}

function CountdownBranch(props: { branch: string }) {
  const overrides = fluentStyles();

  return (
    <Badge className={overrides.badge} appearance="outline">
      {props.branch}
    </Badge>
  );
}
