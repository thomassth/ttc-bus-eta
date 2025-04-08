import { useQuery } from "@tanstack/react-query";

import { ttcAlerts } from "../fetch/queries.js";
import { SkeetList } from "./SkeetList.js";

export default function TtcAlertList() {
  const socialMediaQuery = useQuery(ttcAlerts);
  // const gtfsAlertsResp = useQuery(gtfsAlerts);

  return (
    <div className="alert-page">
      <h1>Recent Service Alerts</h1>
      <p>
        Source:{" "}
        <a href="https://bsky.app/profile/ttcalerts.bsky.social">
          https://bsky.app/profile/ttcalerts.bsky.social
        </a>
      </p>
      {/* {Array.isArray(gtfsAlertsResp.data?.entity) &&
        gtfsAlertsResp.data.entity.map((item) => (
          <p>{item.alert.descriptionText.translation[0].text}</p>
        ))} */}
      {socialMediaQuery.data && (
        <SkeetList skeetList={socialMediaQuery.data?.feed} line={"all"} />
      )}
    </div>
  );
}
