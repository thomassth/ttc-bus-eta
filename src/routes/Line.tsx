import { Accordion, Title1 } from "@fluentui/react-components";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { SkeetList } from "../components/alerts/SkeetList.js";
import RouteInfo from "../components/fetch/FetchRoute.js";
import SubwayRouteInfo from "../components/fetch/FetchSubwayRoute.js";
import { ttcAlerts } from "../components/fetch/queries.js";

export default function Line() {
  const params = useParams();
  const { t } = useTranslation();

  const lineNum = parseInt(`${params.lineId}`);

  const bskyAlerts = useQuery(ttcAlerts);

  const filteredBskyAlerts =
    bskyAlerts.data?.feed.filter(
      (skeet: { post: { record: { text: string } } }) =>
        lineNum < 6
          ? skeet.post.record.text.match(`Line ${lineNum}`)
          : skeet.post.record.text.startsWith(`${lineNum}`)
    ) ?? [];

  useEffect(() => {
    document.title = t("lines.browserTitle", { lineNum });
  });

  return (
    <main className="line-page">
      {filteredBskyAlerts.length > 0 && (
        <SkeetList skeetList={filteredBskyAlerts} line={`${lineNum}`} />
      )}
      <Title1>{t("lines.number", { lineNum })}</Title1>
      <Accordion defaultOpenItems collapsible>
        {lineNum < 6 && <SubwayRouteInfo line={lineNum} />}
        {lineNum >= 6 && <RouteInfo line={lineNum} />}
      </Accordion>
    </main>
  );
}
