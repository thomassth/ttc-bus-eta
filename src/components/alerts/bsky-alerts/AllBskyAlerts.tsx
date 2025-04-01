import {
  SelectTabData,
  SelectTabEvent,
  Tab,
  TabList,
} from "@fluentui/react-components";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";

import { TtcBadge } from "../../badges.js";
import { ttcAlerts } from "../../fetch/queries.js";
import { parseLine } from "../AlertUtils.js";
import style from "./AllBskyAlerts.module.css";
import { SkeetList } from "./SkeetList.js";

export const AllBskyAlerts = () => {
  const bskyAlerts = useQuery(ttcAlerts);

  const bskyAlertWithLines = useMemo(() => {
    return (
      bskyAlerts.data?.feed.map((alert) => {
        const line = parseInt(parseLine(alert.post.record.text));
        return {
          ...alert,
          line,
        };
      }) ?? []
    );
  }, [bskyAlerts.data?.feed]);

  const bskyAlertLines = useMemo(() => {
    const lines = bskyAlerts.data?.feed.map((alert) => {
      return parseInt(parseLine(alert.post.record.text));
    });

    return Array.from(new Set(lines)).sort((a, b) => (a > b ? 1 : -1));
  }, [bskyAlerts.data?.feed]);
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
  return (
    <div>
      <h2>Recent alerts ({bskyAlerts.data?.feed.length})</h2>
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
              <TtcBadge lineNum={line.toString()} />
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
