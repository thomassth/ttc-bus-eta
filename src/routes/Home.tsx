import {
  Badge,
  Button,
  SelectTabData,
  SelectTabEvent,
  Tab,
  TabList,
  TabValue,
} from "@fluentui/react-components";
import { t } from "i18next";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import FavouriteEta from "../components/eta/FavouriteEta.js";
import Nearby from "../components/nearby/Nearby.js";
import { stopBookmarksSelectors } from "../store/bookmarks/slice.js";
import { store, useAppDispatch } from "../store/index.js";
import { changeSettings, settingsSelectors } from "../store/settings/slice.js";
import style from "./Home.module.css";
import Search from "./Search.js";

export default function Home() {
  const stopBookmarks = stopBookmarksSelectors.selectAll(
    store.getState().stopBookmarks
  );
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
        className="directon-buttons"
        onTabSelect={handleTabClick}
      >
        <Tab value={"nearby"} className={style["button-with-badge"]}>
          Nearby<Badge>Beta</Badge>
        </Tab>
        <Tab value={"favourites"}>Favourites</Tab>
      </TabList>
      <div className={enabledTab === "nearby" ? "" : style.hidden}>
        <Nearby />
      </div>
      <div className={enabledTab === "favourites" ? "" : style.hidden}>
        {stopBookmarks.length === 0 ? (
          <section className="item-info-placeholder">
            <p>{t("home.headline")}</p>
            <p>{t("home.bookmarkReminder")}</p>
            <p>
              {t("home.orSee")}
              <Link style={{ marginLeft: "1rem" }} to="/lines">
                <Button>{t("home.allRoutes")}</Button>
              </Link>
            </p>
          </section>
        ) : (
          <FavouriteEta />
        )}
      </div>
    </main>
  );
}
