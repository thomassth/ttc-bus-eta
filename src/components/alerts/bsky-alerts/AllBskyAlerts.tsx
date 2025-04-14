import {
  SelectTabData,
  SelectTabEvent,
  Tab,
  TabList,
} from "@fluentui/react-components";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNowStrict } from "date-fns";
import { useCallback, useMemo, useState } from "react";

import { TtcBadge } from "../../badges.js";
import { atprotoTtcAlerts } from "../../fetch/queries.js";
import { parseLine } from "../AlertUtils.js";
import style from "./AllBskyAlerts.module.css";
import { SkeetList } from "./SkeetList.js";

export const AllBskyAlerts = () => {
  const bskyAlerts = useQuery(atprotoTtcAlerts);

  const bskyAlertWithLines = useMemo(() => {
    return (
      bskyAlerts.data?.map((alert) => {
        const line = parseInt(parseLine(alert.post.record.text as string));
        return {
          ...alert,
          line,
        };
      }) ?? []
    );
  }, [bskyAlerts.data]);

  const bskyAlertLines = useMemo(() => {
    const lines = bskyAlerts.data?.map((alert) => {
      return parseInt(parseLine(alert.post.record.text as string));
    });

    return Array.from(new Set(lines)).sort((a, b) => (a > b ? 1 : -1));
  }, [bskyAlerts.data]);
  const [enabledTab, setEnabledTab] = useState("all");

  const handleTabClick = useCallback(
    (event: SelectTabEvent, data: SelectTabData) => {
      setEnabledTab(data.value as string);
    },
    [enabledTab]
  );

  const filteredBskyAlerts = useMemo(() => {
    if (enabledTab === "all") {
      return bskyAlertWithLines;
    }
    return bskyAlertWithLines.filter((skeet) => {
      return skeet.line === parseInt(enabledTab);
    });
  }, [enabledTab, bskyAlertWithLines]);
  const lastSkeetTime = useMemo(() => {
    if (!bskyAlerts.data?.length) return null;
    const lastSkeet = bskyAlerts.data[bskyAlerts.data.length - 1];
    return formatDistanceToNowStrict(lastSkeet.post.record.createdAt as string);
  }, [bskyAlerts.data]);
  return (
    <div>
      <h2>Recent alerts (last {lastSkeetTime})</h2>
      <TabList
        defaultSelectedValue="all"
        onTabSelect={handleTabClick}
        className={style.tablist}
      >
        <Tab value="all" id="all">
          All
        </Tab>
        {bskyAlertLines?.map((line) => {
          return (
            <Tab key={line} value={line} id={line.toString()}>
              <TtcBadge lineNum={line.toString()} type="standalone" />
            </Tab>
          );
        })}
      </TabList>
      <p>
        Source:{" "}
        <a href="https://bsky.app/profile/ttcalerts.bsky.social">
          https://bsky.app/profile/ttcalerts.bsky.social
        </a>
      </p>
      {bskyAlerts.data && (
        <SkeetList skeetList={filteredBskyAlerts ?? []} line={"all"} />
      )}
    </div>
  );
};
