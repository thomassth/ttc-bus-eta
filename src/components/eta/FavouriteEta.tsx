import { Button, Text } from "@fluentui/react-components";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useSettingsStore } from "../../store/settingsStore.js";
import Bookmark from "../bookmarks/Bookmark.js";
import RawDisplay from "../rawDisplay/RawDisplay.js";
import { BookmarkCardEta } from "./BookmarkCardEta.js";
import style from "./FavouriteEta.module.css";

export default function FavouriteEta() {
  const stopBookmarks = useSettingsStore((state) => state.stopBookmarks);
  const { t } = useTranslation();
  // const [lastUpdatedAt, setLastUpdatedAt] = useState<number>(0);
  const unifiedEtaValue = useSettingsStore((state) => state.unifiedEta);

  let fetchUrl = "";

  for (const item of stopBookmarks.values()) {
    const ttcStop = item.ttcId;

    const lines = item.enabled ? item.enabled : item.lines;

    if (lines && lines.length > 0)
      for (const line of lines) {
        if (parseInt(line) > 6)
          fetchUrl = fetchUrl.concat(`&stops=${parseInt(line)}|${ttcStop}`);
      }
  }

  const EtaCards = [];
  if (unifiedEtaValue) {
    for (const item of stopBookmarks.values()) {
      if (
        stopBookmarks.size > 0 ||
        (item.type === "ttc-subway" && (item.enabled?.length ?? 1) > 0)
      ) {
        const id = item.stopId;

        const subwayDb = useSettingsStore((state) => state.subwayStops);
        const name =
          item.type === "ttc-subway" && id
            ? (subwayDb.get(id)?.name ?? item.name)
            : item.name;

        EtaCards.push(
          <BookmarkCardEta
            key={`ttc-${id}`}
            item={{
              stopName: name,
              stopTag: id,
              line: item.enabled ? item.enabled : item.lines,
              type: item.type,
              direction: item.direction,
            }}
          />
        );
      }
    }
  } else {
    for (const item of stopBookmarks.values()) {
      for (const line of item.lines) {
        const id = `${line}-${item.stopId}`;
        EtaCards.push(
          <BookmarkCardEta
            item={{ ...item, line, stopName: item.name, stopTag: item.stopId }}
            key={id}
          />
        );
      }
    }
  }

  return (
    <article className={style["favorite-eta"]}>
      {EtaCards.length > 0 ? (
        <>
          {navigator.onLine ? null : (
            <Text>Device seems to be offline. Results may be inaccurate.</Text>
          )}
          <ul>{EtaCards}</ul>
        </>
      ) : !navigator.onLine ? (
        <section>
          <p>
            {navigator.onLine
              ? t("home.homeNoEta")
              : "Your device seems to be offline."}
          </p>
          <Bookmark />
        </section>
      ) : null}
      <Link to={"/bookmarks"}>
        <Button>{t("buttons.bookmarkEdit")}</Button>
      </Link>
      {stopBookmarks && (
        <RawDisplay data={Array.from(stopBookmarks.values())} />
      )}
    </article>
  );
}
