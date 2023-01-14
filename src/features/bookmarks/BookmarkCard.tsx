import { Button, Link, Text } from "@fluentui/react-components";
import { Card } from "@fluentui/react-components/unstable";
import { Delete24Regular } from "@fluentui/react-icons";
import { t } from "i18next";
import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { removeStopBookmark } from "./stopBookmarkSlice";

export function BookmarkCard(props: { id: number }) {
  const id = props.id;
  const dispatch = useAppDispatch();
  const stopBookmarks = useAppSelector((state) => state.stopBookmarks);

  const checkBookmarkStatus = useCallback(() => {
    dispatch(removeStopBookmark(props.id));
  }, [stopBookmarks.ids]);

  return (
    <Card>
      <div className="card-row">
        <Link href={`stops/${stopBookmarks.entities[id].stopId}`}>
          <Text weight="semibold">{stopBookmarks.entities[id].name}</Text>
        </Link>
        <Button
          title={t("buttons.delete") ?? "delete"}
          icon={<Delete24Regular />}
          onClick={checkBookmarkStatus}
        />
      </div>
    </Card>
  );
}
