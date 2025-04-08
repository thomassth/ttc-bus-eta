import { formatDistanceStrict } from "date-fns";

import { ParsedTtcAlertText } from "./AlertUtils.js";

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

  const parsedText = ParsedTtcAlertText(badge, feedText, cid);
  return (
    <li>
      <p className="time">
        {formatDistanceStrict(skeet.post.record.createdAt, new Date(), {
          addSuffix: true,
        })}
      </p>
      <span className="content">{parsedText}</span>
    </li>
  );
};
