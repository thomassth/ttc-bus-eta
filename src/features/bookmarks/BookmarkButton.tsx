import { Button } from "@fluentui/react-components";
import { Bookmark24Filled, Bookmark24Regular } from "@fluentui/react-icons";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addStopBookmark } from "./stopBookmarkSlice";

export const BookmarkButton = function (props: {
  stopId: number;
  name: string;
  ttcId: number;
}) {
  const dispatch = useAppDispatch();
  const stopBookmarks = useAppSelector((state: any) => state.stopBookmarks);

  const checkBookmarkStatus = (stopId: number) => {
    if (stopBookmarks.ids.includes(stopId)) {
      console.log(stopBookmarks.ids);
    } else {
      checkAndAddBookmark(stopId);
    }
  };

  const checkAndAddBookmark = (stopId: number) => {
    console.log(`${stopId}`);

    dispatch(
      addStopBookmark({
        stopId,
        name: props.name,
        ttcId: props.ttcId,
      })
    );
  };

  return (
    <Button
      icon={
        stopBookmarks.ids.includes(props.stopId) ? (
          <Bookmark24Filled />
        ) : (
          <Bookmark24Regular />
        )
      }
      onClick={() => checkBookmarkStatus(props.stopId)}
    ></Button>
  );
};
