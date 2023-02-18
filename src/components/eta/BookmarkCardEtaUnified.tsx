import { Badge, Text } from "@fluentui/react-components";
import { Card, CardHeader } from "@fluentui/react-components/unstable";
import { Link } from "react-router-dom";

import { stopBookmarkWithEta } from "../../models/etaObjects";
import { fluentStyles } from "../../styles/fluent";
import { CountdownSec } from "../countdown/CountdownSec";

export function BookmarkCardEtaUnified(props: { item: stopBookmarkWithEta }) {
  const fluentStyle = fluentStyles();
  const stopUrl = `/stops/${props.item.stopId}`;

  return (
    <li>
      <Card>
        <CardHeader
          header={
            <Link className={`bookmarkedStop`} to={stopUrl}>
              <div className="badgeGroup">
                {props.item.lines.map((line: string) => {
                  return (
                    <Badge className={fluentStyle.badge} key={line}>
                      {line}
                    </Badge>
                  );
                })}
              </div>
              <Text>{props.item.name}</Text>
            </Link>
          }
          action={
            <div className="etaCardCountdown">
              <CountdownSec
                second={props.item.etas[0].seconds}
                epochTime={props.item.etas[0].epochTime}
              />
            </div>
          }
        />
      </Card>
    </li>
  );
}
