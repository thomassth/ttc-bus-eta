import { type Skeet, SkeetElement } from "./Skeet.js";
import style from "./SkeetList.module.css";

const parseFullLineNumber = (skeet: Skeet) => {
  // Match the line number as well as any possible suffix (e.g. matches "96" or "96A")
  const lineTextMatch = skeet.post.record.text.match(/^\d{1,3}\S/);
  return lineTextMatch?.[0] ?? null;
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
  const lineNumber =
    skeetList?.length > 0 ? parseFullLineNumber(skeetList?.[0]) : line;
  const badgeArg =
    line === "all" ? { highlightAll: true } : { line: lineNumber };
  const dataArray = skeetList.map((skeet) => (
    <SkeetElement key={skeet.post.cid} skeet={skeet} badge={badgeArg} />
  ));

  const styleList =
    type === "compact"
      ? [style["skeet-list"], style.compact]
      : [style["skeet-list"]];

  return <ul className={styleList.join(" ")}>{dataArray}</ul>;
};
