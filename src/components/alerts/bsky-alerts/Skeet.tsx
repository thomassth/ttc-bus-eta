import { formatDistanceStrict } from "date-fns";

import { ParsedTtcAlertText } from "../AlertUtils.js";

export const SkeetElement = ({
  skeet,
  badge,
}: {
  skeet: {
    post: {
      cid: string;
      record: { text: string; createdAt: string };
    };
  };
  badge: { highlightAll?: boolean; line?: string };
}) => {
  const cid = skeet.post.cid;
  const feedText = skeet.post.record.text;

  return (
    <li>
      <p className="time">
        {formatDistanceStrict(skeet.post.record.createdAt, new Date(), {
          addSuffix: true,
        })}
      </p>
      <span className="content">
        <ParsedTtcAlertText badge={badge} feedText={feedText} id={cid} />
      </span>
    </li>
  );
};
