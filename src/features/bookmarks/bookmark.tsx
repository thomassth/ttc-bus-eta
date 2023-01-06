import { Badge, Button, Link, Text } from "@fluentui/react-components";
import { Card } from "@fluentui/react-components/unstable";
import { useCallback } from "react";
import { Trans, useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import RawDisplay from "../../components/RawDisplay";
import { clearStopBookmarks } from "./stopBookmarkSlice";

export default function Bookmark() {
  const stopBookmarks = useAppSelector((state: any) => state.stopBookmarks);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  console.log(stopBookmarks.entities);

  const clearAllBookmarks = useCallback(() => {
    dispatch(clearStopBookmarks());
  }, []);

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
          <Trans>{t("home.headline")}</Trans>
          <Text>{t("home.bookmarkReminder")}</Text>
        </section>
      ) : null}
      <div className="bookmarks">
        {stopBookmarks.ids.map((item: any) => (
          <BookmarkCard key={item} id={item} />
        ))}
      </div>
      {stopBookmarks.ids.length > 0 ? (
        <Button onClick={clearAllBookmarks}>{t("buttons.clear")}</Button>
      ) : null}

      <RawDisplay data={stopBookmarks} />
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
