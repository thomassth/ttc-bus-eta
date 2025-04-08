import { formatDistanceStrict } from "date-fns";

import { TtcBadge } from "../badges.js";

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
  const lineNum = parseInt(`${badge.line}`);
  const feedText = skeet.post.record.text;

  const lineFilter = badge.line
    ? lineNum < 6
      ? `Line ${lineNum}`
      : `${lineNum}`
    : badge.highlightAll
      ? (feedText.match(/\d+/)?.[0] ?? "")
      : "";

  const parsedText =
    badge.line || badge.highlightAll
      ? feedText
          .split(lineFilter)
          .flatMap((item) => [
            item,
            <TtcBadge lineNum={lineFilter} key={`${cid}-${lineFilter}`} />,
          ])
          .slice(0, -1)
      : feedText;
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
