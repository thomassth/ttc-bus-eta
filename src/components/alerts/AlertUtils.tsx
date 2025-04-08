import { TtcBadge } from "../badges.js";

export const ParsedTtcAlertText = (
  badge: { highlightAll?: boolean; line?: string },
  feedText: string,
  id: string
) => {
  const lineNum = parseInt(`${badge.line}`);

  const lineFilter = badge.line
    ? lineNum < 6
      ? `Line ${lineNum}`
      : `${lineNum}`
    : badge.highlightAll
      ? (feedText.match(/\d+/)?.[0] ?? "")
      : "";

  return badge.line || badge.highlightAll
    ? feedText
        .split(lineFilter)
        .flatMap((item) => [
          item,
          <TtcBadge lineNum={lineFilter} key={`${id}-${lineFilter}`} />,
        ])
        .slice(0, -1)
    : feedText;
};
