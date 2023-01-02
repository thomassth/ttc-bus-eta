import { Button, Text } from "@fluentui/react-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { addStopBookmark, clearStopBookmarks } from "./bookmarkSlice";

export default function Bookmark() {
  const stopBookmarks = useAppSelector((state: any) => state.stopBookmarks);
  const dispatch = useAppDispatch();

  return (
    <main>
      <Button
        onClick={() =>
          dispatch(addStopBookmark({ stopId: 100, name: "test", ttcId: 101 }))
        }
      >
        Add
      </Button>
      <Button onClick={() => dispatch(clearStopBookmarks())}>Clear</Button>
      <Text>{JSON.stringify(stopBookmarks, null, 4)}</Text>
    </main>
  );
}
