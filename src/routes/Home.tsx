import { t } from "i18next";
import { Trans } from "react-i18next";

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
          <Trans>{t("home.headline")}</Trans>
          <span>{t("home.bookmarkReminder")}</span>
        </section>
      ) : (
        <FavouriteEta />
      )}
    </main>
  );
}
