import { Badge, Link } from "@fluentui/react-components";
import { Card } from "@fluentui/react-components/unstable";

import { useAppSelector } from "../../app/hooks";

export function BookmarkCard(props: { id: number }) {
  const id = props.id;
  const stopBookmarks = useAppSelector((state) => state.stopBookmarks);
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
}
