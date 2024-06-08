import { Button } from "@fluentui/react-components";
import { t } from "i18next";
import { Link } from "react-router-dom";

import FavouriteEta from "../components/eta/FavouriteEta.js";
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
      {stopBookmarks.length === 0 ? (
        <section className="item-info-placeholder">
          <p>{t("home.headline")}</p>
          <p>{t("home.bookmarkReminder")}</p>
          <p>
            Or, see
            <Link style={{ marginLeft: "1rem" }} to="/lines">
              <Button>All routes</Button>
            </Link>
          </p>
        </section>
      ) : (
        <FavouriteEta />
      )}
    </main>
  );
}
