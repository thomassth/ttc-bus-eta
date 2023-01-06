import { Badge, Link } from "@fluentui/react-components";
import { Card } from "@fluentui/react-components/dist/unstable";

import { useAppSelector } from "../../app/hooks";

export const BookmarkCard = (props: any) => {
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
