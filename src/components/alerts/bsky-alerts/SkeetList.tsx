import { SkeetElement } from "./Skeet.js";
import style from "./SkeetList.module.css";

export const SkeetList = ({
  skeetList,
  line,
}: {
  skeetList: any[];
  line?: string;
}) => {
  const badgeArg = line === "all" ? { highlightAll: true } : { line };
  const dataArray = skeetList.map((skeet) => (
    <SkeetElement key={skeet.post.cid} skeet={skeet} badge={badgeArg} />
  ));

  return <ul className={style["skeet-list"]}>{dataArray}</ul>;
};
