import { useQuery } from "@tanstack/react-query";

import { ttcAlerts } from "../fetch/queries.js";
import { SkeetList } from "./bsky-alerts/SkeetList.js";

export function TtcAlertList({ lineNum }: { lineNum: number[] }) {
  const bskyAlerts = useQuery(ttcAlerts);

  const filteredBskyAlerts =
    bskyAlerts.data?.feed.filter(
      (skeet: { post: { record: { text: string } } }) =>
        lineNum.some((line) => {
          return line < 6
            ? skeet.post.record.text.match(`Line ${line}`)
            : skeet.post.record.text.startsWith(`${line}`);
        })
    ) ?? [];
  return (
    <>
      {filteredBskyAlerts.length > 0 && (
        <SkeetList
          skeetList={filteredBskyAlerts}
          line={lineNum.length > 1 ? "all" : `${lineNum[0]}`}
        />
      )}
    </>
  );
}
