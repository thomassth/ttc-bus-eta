import { Button } from "@fluentui/react-components";
import { t } from "i18next";
import { Link } from "react-router-dom";

import FavouriteEta from "../components/eta/FavouriteEta.js";
import NearbyList from "../components/nearby/nearby-list.js";
import { stopBookmarksSelectors } from "../store/bookmarks/slice.js";
import { store } from "../store/index.js";
import Search from "./Search.js";

export default function Home() {
  const stopBookmarks = stopBookmarksSelectors.selectAll(
    store.getState().stopBookmarks
  );

  return (
    <main className="home-page">
      <Search />
      <NearbyList />
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
    </main>
  );
}
