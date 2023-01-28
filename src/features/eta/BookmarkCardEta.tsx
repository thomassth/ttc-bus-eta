import { Badge, Text } from "@fluentui/react-components";
import { Card } from "@fluentui/react-components/unstable";
import { Link } from "react-router-dom";

import { CountdownSec } from "../../components/countdown/CountdownSec";
import { LineStopEta } from "../../data/etaObjects";
import { fluentStyles } from "../../styles/fluent";

export function BookmarkCardEta(props: { item: LineStopEta }) {
  const id = `${props.item.line}-${props.item.stopTag}`;
  console.log(id);
  // const dispatch = useAppDispatch();
  // const stopBookmarks: stopBookmarkRedux = useAppSelector(
  //   (state) => state.stopBookmarks
  // );
  const fluentStyle = fluentStyles();

  // const checkBookmarkStatus = useCallback(() => {
  //   dispatch(removeStopBookmark(props.id));
  // }, [stopBookmarks.ids]);

  return (
    <li key={id}>
      <Card className={fluentStyle.etaCardContainer}>
        <Link
          className={`bookmarkedStop ${fluentStyle.etaCardContainer}`}
          to={`/lines/${props.item.line}/${props.item.stopTag}`}
        >
          <div className="badgeGroup">
            <Badge className={fluentStyle.badge} key={props.item.line}>
              {props.item.etas[0].branch}
            </Badge>
          </div>
          <Text weight="semibold">TO: {props.item.routeName}</Text>
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
