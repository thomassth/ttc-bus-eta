import {
  Badge,
  Button,
  SelectTabData,
  SelectTabEvent,
  Tab,
  TabList,
} from "@fluentui/react-components";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import FavouriteEta from "../components/eta/FavouriteEta.js";
import Nearby from "../components/nearby/Nearby.js";
import { stopBookmarksSelectors } from "../store/bookmarks/slice.js";
import { store } from "../store/index.js";
import { useSettingsStore } from "../store/settingsStore.js";
import style from "./Home.module.css";
import Search from "./Search.js";

export default function Home() {
  const { t } = useTranslation();

  const enabledTab = useSettingsStore((state) => state.defaultHomeTab);
  const setEnabledTab = useSettingsStore((state) => state.setDefaultHomeTab);

  const handleTabClick = useCallback(
    (event: SelectTabEvent, data: SelectTabData) => {
      setEnabledTab(data.value ?? "favourites");
    },
    [enabledTab]
  );
  return (
    <main className="home-page">
      <Search />
      <TabList
        defaultSelectedValue={enabledTab}
        className="directon-buttons"
        onTabSelect={handleTabClick}
      >
        <Tab value={"nearby"} className={style["button-with-badge"]}>
          {t("nav.label.nearby")}
          <Badge>Beta</Badge>
        </Tab>
        <Tab value={"favourites"}>{t("nav.label.bookmarks")}</Tab>
      </TabList>
      <div className={enabledTab === "nearby" ? "" : style.hidden}>
        <Nearby />
      </div>
      <div className={enabledTab === "favourites" ? "" : style.hidden}>
        <HomeBookmarks />
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
