import {
  SelectTabData,
  SelectTabEvent,
  Tab,
  TabList,
  TabValue,
} from "@fluentui/react-components";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

import { ttcAlerts } from "../fetch/queries.js";
import style from "./AlertsPage.module.css";
import CurrentAlerts from "./CurrentAlerts.js";
import { SkeetList } from "./SkeetList.js";
import { SubwayClosures } from "./SubwayClosures.js";

export default function TtcAlertList() {
  const socialMediaQuery = useQuery(ttcAlerts);
  const [enabledTab, setEnabledTab] = useState<TabValue>("now");
  const handleTabClick = useCallback(
    (event: SelectTabEvent, data: SelectTabData) => {
      setEnabledTab(data.value);
    },
    [enabledTab]
  );
  const currentDate = new Date().toISOString().split("T")[0];
  // get saturday's date
  const weekend = new Date();
  weekend.setDate(weekend.getDate() + ((6 - weekend.getDay()) % 7));

  return (
    <div className="alert-page">
      <SubwayClosures startDate={currentDate} />
      <TabList defaultSelectedValue="now" onTabSelect={handleTabClick}>
        <Tab value="now">Now</Tab>
        {/* <Tab value="later">Later</Tab> */}
        {/* <Tab value="now">Today</Tab> */}
        <Tab value="weekend">This weekend</Tab>
        {/* <Tab value="all">All alerts</Tab> */}
      </TabList>
      <div className={enabledTab === "now" ? "" : style.hidden}>
        <CurrentAlerts />
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
      <div className={enabledTab === "weekend" ? "" : style.hidden}>
        <SubwayClosures startDate={weekend.toISOString().split("T")[0]} />
      </div>
    </div>
  );
}
