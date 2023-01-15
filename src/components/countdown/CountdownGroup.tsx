import {
  Badge,
  Link as LinkFluent,
  Text,
  Title2,
} from "@fluentui/react-components";
import { Link } from "react-router-dom";

import { LineStopEta } from "../../data/etaObjects";
import { fluentStyles } from "../../styles/fluent";
import { CountdownSec } from "./CountdownSec";

export default function CountdownGroup(props: { detail: LineStopEta }) {
  const countdownRowList = props.detail.etas.map((el2) => (
    <div className="countdown-row" key={el2.tripTag}>
      <CountdownBranch branch={el2.branch} />
      <CountdownSec second={el2.seconds} epochTime={el2.epochTime} />
    </div>
  ));

  return (
    <div className="line">
      <Title2>
        {props.detail.etas.length === 0 ? (
          props.detail.line
        ) : (
          <Link to={`/lines/${props.detail.line}`}>
            <LinkFluent>{props.detail.line}</LinkFluent>
          </Link>
        )}
      </Title2>
      <Text>{props.detail.routeName}</Text>
      {countdownRowList}
    </div>
  );
}

function CountdownBranch(props: { branch: string }) {
  const fluentStyle = fluentStyles();

  return (
    <Badge className={fluentStyle.badge} appearance="outline">
      {props.branch}
    </Badge>
  );
}
