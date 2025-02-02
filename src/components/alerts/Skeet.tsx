import { formatDistanceStrict } from "date-fns";

import { TtcBadge } from "../badges.js";

export const SkeetElement = ({
  skeet,
  badge,
}: {
  skeet: { post: { record: { text: string; createdAt: string } } };
  badge: { highlightAll?: boolean; line?: string };
}) => {
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
            <TtcBadge lineNum={lineFilter} key={lineFilter} />,
          ])
          .slice(0, -1)
      : feedText;
  return (
    <li>
      <p className="time">
        {formatDistanceStrict(new Date(), skeet.post.record.createdAt, {
          includeSeconds: true,
        })}{" "}
        ago:
      </p>
      <span className="content">{parsedText}</span>
    </li>
  );
};
