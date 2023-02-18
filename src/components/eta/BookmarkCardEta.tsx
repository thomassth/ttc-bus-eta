import { Badge, Text } from "@fluentui/react-components";
import { Card, CardHeader } from "@fluentui/react-components/unstable";
import { Link } from "react-router-dom";

import { LineStopEta, stopBookmarksRedux } from "../../models/etaObjects";
import { useAppSelector } from "../../store";
import { fluentStyles } from "../../styles/fluent";
import { CountdownSec } from "../countdown/CountdownSec";

export function BookmarkCardEta(props: { item: LineStopEta }) {
  const stopBookmarks: stopBookmarksRedux = useAppSelector(
    (state) => state.stopBookmarks
  );
  const fluentStyle = fluentStyles();

  let stopUrl = `/lines/${props.item.line}/${props.item.stopTag}`;

  for (const id of stopBookmarks.ids) {
    if (stopBookmarks.entities[id].ttcId === props.item.stopTag) {
      stopUrl = `/stops/${stopBookmarks.entities[id].stopId}`;
    }
  }

  return (
    <li>
      <Link to={stopUrl}>
        <Card className="etaCardContainer">
          <CardHeader
            header={
              <div className="etaCardStopInfo">
                <div>
                  <Badge className={fluentStyle.badge} key={props.item.line}>
                    {props.item.etas[0].branch}
                  </Badge>
                  <Text weight="semibold">TO: {props.item.routeName}</Text>
                </div>
                <Text>{props.item.stopName}</Text>
              </div>
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
      </Link>
    </li>
  );
}
