import {
  Badge,
  Button,
  SelectTabData,
  SelectTabEvent,
  Tab,
  TabList,
  TabValue,
} from "@fluentui/react-components";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import TtcAlertList from "../components/alerts/AlertsPage.js";
import FavouriteEta from "../components/eta/FavouriteEta.js";
import Nearby from "../components/nearby/Nearby.js";
import StopSearch from "../components/search/StopSearch.js";
import { stopBookmarksSelectors } from "../store/bookmarks/slice.js";
import { store, useAppDispatch } from "../store/index.js";
import { changeSettings, settingsSelectors } from "../store/settings/slice.js";
import style from "./Home.module.css";
import Search from "./Search.js";

export default function Home() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const defaultHomeTabValue = settingsSelectors.selectById(
    store.getState().settings,
    "defaultHomeTab"
  ) ?? { value: "favourites" };
  const [enabledTab, setEnabledTab] = useState<TabValue>(
    defaultHomeTabValue.value ?? "favourites"
  );

  const handleTabClick = useCallback(
    (event: SelectTabEvent, data: SelectTabData) => {
      setEnabledTab(data.value);
      dispatch(
        changeSettings({
          id: "defaultHomeTab",
          name: "defaultHomeTab",
          value: `${data.value}`,
        })
      );
    },
    [enabledTab]
  );
  return (
    <main className="home-page">
      <Search />
      <TabList
        defaultSelectedValue={enabledTab}
        className="direction-buttons"
        onTabSelect={handleTabClick}
      >
        <Tab value={"nearby"}>{t("nav.label.nearby")}</Tab>
        <Tab value={"favourites"}>{t("nav.label.bookmarks")}</Tab>
        <Tab value={"alerts"} className={style["button-with-badge"]}>
          Service Alerts<Badge>Beta</Badge>
        </Tab>
      </TabList>
      <div className={enabledTab === "nearby" ? "" : style.hidden}>
        <Nearby />
      </div>
      <div className={enabledTab === "favourites" ? "" : style.hidden}>
        <HomeBookmarks />
      </div>
      <div className={enabledTab === "alerts" ? "" : style.hidden}>
        <TtcAlertList />
      </div>
    </main>
  );
}

function HomeBookmarks() {
  const { t } = useTranslation();
  const stopBookmarks = stopBookmarksSelectors.selectAll(
    store.getState().stopBookmarks
  );
  if (stopBookmarks.length === 0) {
    return (
      <section className="item-info-placeholder">
        <StopSearch />
        <p>{t("home.headline")}</p>
        <p>{t("home.bookmarkReminder")}</p>
        <p>
          {t("home.orSee")}
          <Link
            style={{
              marginLeft: "1rem",
            }}
            to="/lines"
          >
            <Button>{t("home.allRoutes")}</Button>
          </Link>
        </p>
      </section>
    );
  } else return <FavouriteEta />;
}
