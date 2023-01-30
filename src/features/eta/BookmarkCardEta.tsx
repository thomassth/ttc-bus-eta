import { Badge, Text } from "@fluentui/react-components";
import { Card } from "@fluentui/react-components/unstable";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { CountdownSec } from "../../components/countdown/CountdownSec";
import { LineStopEta, stopBookmarkRedux } from "../../data/etaObjects";
import { fluentStyles } from "../../styles/fluent";

export function BookmarkCardEta(props: { item: LineStopEta }) {
  const id = `${props.item.line}-${props.item.stopTag}`;
  console.log(id);
  const stopBookmarks: stopBookmarkRedux = useAppSelector(
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
    <li key={id}>
      <Card className={fluentStyle.etaCardContainer}>
        <Link className={`bookmarkedStop`} to={stopUrl}>
          <div className="badgeGroup">
            <Badge className={fluentStyle.badge} key={props.item.line}>
              {props.item.etas[0].branch}
            </Badge>
            <Text weight="semibold">TO: {props.item.routeName}</Text>
          </div>
          <Text>{props.item.stopName}</Text>
        </Link>
        <div className="etaCardCountdown">
          <CountdownSec
            second={props.item.etas[0].seconds}
            epochTime={props.item.etas[0].epochTime}
          />
        </div>
      </Card>
    </li>
  );
}
