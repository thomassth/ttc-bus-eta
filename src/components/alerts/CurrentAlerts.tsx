import { useQuery } from "@tanstack/react-query";

import { gtfsAlerts } from "../fetch/queries.js";
import { ParsedTtcAlertText } from "./AlertUtils.js";

export default function CurrentAlerts() {
  const gtfsAlertsResp = useQuery(gtfsAlerts);

  return (
    <>
      {Array.isArray(gtfsAlertsResp.data?.entity) && <h3>Current alerts</h3>}
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
    </>
  );
}
