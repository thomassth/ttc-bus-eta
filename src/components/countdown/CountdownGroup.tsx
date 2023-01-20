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
    <div className="countdownRow" key={el2.tripTag}>
      <CountdownBranch branch={el2.branch} />
      <CountdownSec second={el2.seconds} epochTime={el2.epochTime} />
    </div>
  ));

  if (props.detail.etas.length === 0) {
    return null;
  } else
    return (
      <li>
        <div className="lines">
          <Link to={`/lines/${props.detail.line}`} className="routerLink">
            <LinkFluent>
              <Title2>
                {props.detail.etas.length === 0
                  ? props.detail.line
                  : props.detail.line}
              </Title2>
            </LinkFluent>
          </Link>

          <Text>{props.detail.routeName}</Text>
          {countdownRowList}
        </div>
      </li>
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
