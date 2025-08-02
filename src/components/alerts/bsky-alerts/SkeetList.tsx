import { type Skeet, SkeetElement } from "./Skeet.js";
import style from "./SkeetList.module.css";

const parseFullLineNumber = (skeets: Skeet[]) => {
  if (skeets?.length === 0) {
    return;
  }
  // Match the line number as well as any possible suffix (e.g. matches "96" or "96A")
  const lineTextMatch = skeets[0].post.record.text.match(/^\d{1,3}\S/);
  return lineTextMatch?.[0];
};

export const SkeetList = ({
  skeetList,
  line,
  type,
}: {
  skeetList: Skeet[];
  line?: string;
  type?: string;
}) => {
  const lineNumber = parseFullLineNumber(skeetList);
  const badgeArg =
    line === "all"
      ? { highlightAll: true }
      : { line: typeof lineNumber === "string" ? lineNumber : line };
  const dataArray = skeetList.map((skeet) => (
    <SkeetElement key={skeet.post.cid} skeet={skeet} badge={badgeArg} />
  ));

  const styleList =
    type === "compact"
      ? [style["skeet-list"], style.compact]
      : [style["skeet-list"]];

  return <ul className={styleList.join(" ")}>{dataArray}</ul>;
};
