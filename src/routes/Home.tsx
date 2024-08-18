import {
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
import Nearby from "../components/nearby/nearby.js";
import { stopBookmarksSelectors } from "../store/bookmarks/slice.js";
import { store } from "../store/index.js";
import Search from "./Search.js";

export default function Home() {
  const stopBookmarks = stopBookmarksSelectors.selectAll(
    store.getState().stopBookmarks
  );

  const [enabledTab, setEnabledTab] = useState<TabValue>("favourites");
  const handleTabClick = useCallback(
    (event: SelectTabEvent, data: SelectTabData) => setEnabledTab(data.value),
    [enabledTab]
  );
  return (
    <main className="home-page">
      <Search />
      <TabList
        defaultSelectedValue={"favourites"}
        className="directon-buttons"
        onTabSelect={handleTabClick}
      >
        <Tab value={"nearby"}>Nearby</Tab>
        <Tab value={"favourites"}>Favourites</Tab>
      </TabList>
      {enabledTab === "nearby" && <Nearby />}
      {enabledTab === "favourites" &&
        (stopBookmarks.length === 0 ? (
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
        ))}
    </main>
  );
}
