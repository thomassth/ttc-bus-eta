import { Button, Text } from "@fluentui/react-components";
import { Card } from "@fluentui/react-components/unstable";
import { Delete24Regular } from "@fluentui/react-icons";
import { t } from "i18next";
import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useNavigate from "../../routes/navigate";
import { removeStopBookmark } from "./stopBookmarkSlice";

export function BookmarkCard(props: { id: number }) {
  const id = props.id;
  const dispatch = useAppDispatch();
  const stopBookmarks = useAppSelector((state) => state.stopBookmarks);
  const { navigate } = useNavigate();

  const checkBookmarkStatus = useCallback(() => {
    dispatch(removeStopBookmark(props.id));
  }, [stopBookmarks.ids]);

  const handleRouteClick = (id: number) => () => {
    navigate(`stops/${stopBookmarks.entities[id].stopId}`);
  };

  return (
    <Card>
      <div className="card-row">
        <Text
          className="bookmarkedStop"
          weight="semibold"
          onClick={handleRouteClick(id)}
        >
          {stopBookmarks.entities[id].name}
        </Text>
        <Button
          title={t("buttons.delete") ?? "delete"}
          icon={<Delete24Regular />}
          onClick={checkBookmarkStatus}
        />
      </div>
    </Card>
  );
}
