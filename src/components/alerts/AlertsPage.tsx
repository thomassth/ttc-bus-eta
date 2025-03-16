import { useQuery } from "@tanstack/react-query";

import { gtfsAlerts, ttcAlerts } from "../fetch/queries.js";
import { ParsedTtcAlertText } from "./AlertUtils.js";
import { SkeetList } from "./SkeetList.js";

export default function TtcAlertList() {
  const socialMediaQuery = useQuery(ttcAlerts);
  const gtfsAlertsResp = useQuery(gtfsAlerts);

  return (
    <div className="alert-page">
      <h1>Recent Service Alerts</h1>
      {Array.isArray(gtfsAlertsResp.data?.entity) && <h2>Current alerts</h2>}
      {Array.isArray(gtfsAlertsResp.data?.entity) &&
        gtfsAlertsResp.data.entity.map((item, index) => (
          <p
            key={item.alert.headerText.translation[0].text}
            id={item.alert.headerText.translation[0].text}
          >
            <ParsedTtcAlertText
              badge={{ highlightAll: true }}
              feedText={item.alert.descriptionText.translation[0].text}
              id={item.alert.headerText.translation[0].text}
            />
          </p>
        ))}
      <h2>Recent alerts ({socialMediaQuery.data?.feed.length})</h2>
      <p>
        Source:{" "}
        <a href="https://bsky.app/profile/ttcalerts.bsky.social">
          https://bsky.app/profile/ttcalerts.bsky.social
        </a>
      </p>
      {socialMediaQuery.data && (
        <SkeetList skeetList={socialMediaQuery.data?.feed} line={"all"} />
      )}
    </div>
  );
}
