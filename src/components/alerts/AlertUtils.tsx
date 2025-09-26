import { TtcBadge } from "../badges.js";

export const parseLine = (feedText: string) => {
  return feedText.match(/\d+/)?.[0] ?? "";
};

export const ParsedTtcAlertText = ({
  badge,
  feedText = "",
  id,
}: {
  badge: { highlightAll?: boolean; line?: string };
  feedText: string;
  id: string;
}) => {
  const lineNum = Number.parseInt(`${badge.line}`);

  const lineFilter = badge.line
    ? lineNum < 6
      ? `${lineNum}`
      : badge.line
    : badge.highlightAll
      ? parseLine(feedText)
      : "";

  return badge.line || (badge.highlightAll && lineFilter.length > 0)
    ? feedText
        .split(lineFilter)
        .flatMap((item) => [
          item,
          <TtcBadge
            lineNum={lineFilter}
            key={`${id}-${lineFilter}`}
            type="standalone"
          />,
        ])
        .slice(0, -1)
    : feedText;
};
