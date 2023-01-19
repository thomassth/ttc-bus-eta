import { Badge, Button, Text } from "@fluentui/react-components";
import { Card } from "@fluentui/react-components/unstable";
import { Dismiss12Filled } from "@fluentui/react-icons";
import { t } from "i18next";
import { useCallback } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fluentStyles } from "../../styles/fluent";
import { removeStopBookmark } from "./stopBookmarkSlice";

export function BookmarkCard(props: { id: number }) {
  const id = props.id;
  const dispatch = useAppDispatch();
  const stopBookmarks = useAppSelector((state) => state.stopBookmarks);
  const fluentStyle = fluentStyles();

  const checkBookmarkStatus = useCallback(() => {
    dispatch(removeStopBookmark(props.id));
  }, [stopBookmarks.ids]);

  return (
    <Card className="card-container">
      <Link
        className="bookmarkedStop"
        to={`stops/${stopBookmarks.entities[id].stopId}`}
      >
        <div className="badgeGroup">
          {stopBookmarks.entities[id].lines !== undefined &&
            stopBookmarks.entities[id].lines.map((line: string) => {
              return (
                <Badge className={fluentStyle.badge} key={line}>
                  {line}
                </Badge>
              );
            })}
        </div>
        <Text className="stopName" weight="semibold">
          {stopBookmarks.entities[id].name}
        </Text>
      </Link>
      <Button
        className={fluentStyle.removeButton}
        title={t("buttons.delete") ?? "delete"}
        icon={<Dismiss12Filled />}
        onClick={checkBookmarkStatus}
      />
    </Card>
  );
}
