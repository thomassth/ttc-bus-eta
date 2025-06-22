import { type Skeet, SkeetElement } from "./Skeet.js";
import style from "./SkeetList.module.css";

export const SkeetList = ({
  skeetList,
  line,
  type,
}: {
  skeetList: Skeet[];
  line?: string;
  type?: string;
}) => {
  const badgeArg = line === "all" ? { highlightAll: true } : { line };
  const dataArray = skeetList.map((skeet) => (
    <SkeetElement key={skeet.post.cid} skeet={skeet} badge={badgeArg} />
  ));

  const styleList =
    type === "compact"
      ? [style["skeet-list"], style.compact]
      : [style["skeet-list"]];

  return <ul className={styleList.join(" ")}>{dataArray}</ul>;
};
