import { Badge, Button, Link, Text } from "@fluentui/react-components";
import { Card } from "@fluentui/react-components/unstable";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import RawDisplay from "../../components/RawDisplay";
import { clearStopBookmarks } from "./stopBookmarkSlice";

export default function Bookmark() {
  const stopBookmarks = useAppSelector((state: any) => state.stopBookmarks);
  const dispatch = useAppDispatch();

  console.log(stopBookmarks.entities);

  return (
    <main>
      {/* <Button
        onClick={() =>
          dispatch(
            addStopBookmark({
              stopId: Math.floor(Math.random() * 1000),
              name: "test",
              ttcId: 101,
            })
          )
        }
      >
        Add
      </Button> */}
      {stopBookmarks.ids.length === 0 ? (
        <section>
          <Text>You&apos;ll see saved lists here, in the FUTURE.</Text>
          <br />
          <Text>
            Try clicking the bookmark icons on a stop you frequently visit.
          </Text>
        </section>
      ) : null}
      <div className="bookmarks">
        {stopBookmarks.ids.map((item: any) => (
          <BookmarkCard key={item} id={item} />
        ))}
      </div>
      {stopBookmarks.ids.length > 0 ? (
        <Button onClick={() => dispatch(clearStopBookmarks())}>
          Clear all
        </Button>
      ) : null}

      <RawDisplay data={stopBookmarks}></RawDisplay>
    </main>
  );
}

const BookmarkCard = (props: any) => {
  const id = props.id;
  const stopBookmarks = useAppSelector((state: any) => state.stopBookmarks);
  return (
    <Link href={`stops/${stopBookmarks.entities[id].stopId}`}>
      <Card>
        <div className="countdown-row">
          <Badge>{stopBookmarks.entities[id].ttcId}</Badge>
          {stopBookmarks.entities[id].name}
        </div>
      </Card>
    </Link>
  );
};
