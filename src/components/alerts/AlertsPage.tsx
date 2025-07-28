import {
  type SelectTabData,
  type SelectTabEvent,
  Tab,
  TabList,
  type TabValue,
} from "@fluentui/react-components";
import { useCallback, useState } from "react";

import style from "./AlertsPage.module.css";
// import CurrentAlerts from "./CurrentAlerts.js";
import { AllBskyAlerts } from "./bsky-alerts/AllBskyAlerts.js";
import { SubwayClosures } from "./subway-closures/SubwayClosures.js";

export default function TtcAlertList() {
  const [enabledTab, setEnabledTab] = useState<TabValue>("now");
  const handleTabClick = useCallback(
    (_event: SelectTabEvent, data: SelectTabData) => {
      setEnabledTab(data.value);
    },
    []
  );
  const currentDate = new Date().toISOString().split("T")[0];
  // get saturday's date
  const weekend = new Date();
  weekend.setDate(weekend.getDate() + ((6 - weekend.getDay()) % 7));

  return (
    <div className="alert-page">
      <TabList defaultSelectedValue="now" onTabSelect={handleTabClick}>
        <Tab value="now">Now</Tab>
        {/* <Tab value="later">Later</Tab> */}
        {/* <Tab value="now">Today</Tab> */}
        <Tab value="weekend">This weekend</Tab>
        {/* <Tab value="all">All alerts</Tab> */}
      </TabList>
      <div className={enabledTab === "now" ? "" : style.hidden}>
        <SubwayClosures startDate={currentDate} />
        {/* <CurrentAlerts /> */}
        <AllBskyAlerts />
      </div>
      <div className={enabledTab === "weekend" ? "" : style.hidden}>
        <SubwayClosures startDate={weekend.toISOString().split("T")[0]} />
      </div>
    </div>
  );
}
