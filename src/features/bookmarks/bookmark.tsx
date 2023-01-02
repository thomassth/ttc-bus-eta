import { Button, Text } from "@fluentui/react-components";
import { useSelector, useDispatch } from "react-redux";
import { clearBookmark } from "./bookmarkSlice";

export default function Bookmark() {
  const bookmark = useSelector((state: any) => state.bookmark.value);
  const dispatch = useDispatch();

  return (
    <main>
      <Button onClick={() => dispatch(clearBookmark())}>Clear</Button>
      <Text>{JSON.stringify(bookmark, null, 4)}</Text>
    </main>
  );
}
