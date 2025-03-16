import { useQuery } from "@tanstack/react-query";

import { ttcAlerts } from "../fetch/queries.js";
import { SkeetList } from "./SkeetList.js";

export default function TtcAlertList() {
  const query = useQuery(ttcAlerts);

  return (
    <div>
      <h1>Recent Service Alerts</h1>
      <p>
        Source:{" "}
        <a href="https://bsky.app/profile/ttcalerts.bsky.social">
          https://bsky.app/profile/ttcalerts.bsky.social
        </a>
      </p>
      {query.data && <SkeetList skeetList={query.data?.feed} line={"all"} />}
    </div>
  );
}
