import type { JSX } from "react/jsx-runtime";
import { TtcBadge } from "../badges.js";

export const getLineNumber = (feedText: string) => {
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
  // 1. First number in the string is assumed to be the line number
  const lineNum = badge.highlightAll
    ? getLineNumber(feedText)
    : Number.parseInt(`${badge.line}`);

  // 2. Number is used to build the regex
  const regex = new RegExp(`\\b${lineNum}[A-Z]?\\b`, "g");

  const lineParts = feedText.split(regex);
  const matchResults = feedText.match(regex) ?? [];

  const result: (string | JSX.Element)[] = [];

  // 3. Apply the matches as React
  lineParts.forEach((part, i) => {
    result.push(part);
    if (matchResults[i]) {
      result.push(
        <TtcBadge
          lineNum={matchResults[i]}
          key={`${id}-${part}`}
          type="standalone"
        />
      );
    }
  });

  return result;
};
