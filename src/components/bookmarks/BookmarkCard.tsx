import { useCallback, useMemo } from "react";

import { store } from "../../store/index.js";
import { useSettingsStore } from "../../store/settingsStore.js";
import { subwayDbSelectors } from "../../store/suwbayDb/slice.js";
import { EtaCard } from "../etaCard/EtaCard.js";

export function BookmarkCard(props: { id: number }) {
  const id = props.id;
  const stopBookmarks = useSettingsStore((state) => state.stopBookmarks);

  const stopBookmarksIds = useMemo(
    () => Array.from(stopBookmarks.keys()),
    [stopBookmarks]
  );

  const checkBookmarkStatus = useCallback(() => {
    useSettingsStore.setState((prev) => {
      const updatedBookmarks = new Map(prev.stopBookmarks || []);
      updatedBookmarks.delete(props.id);
      return { stopBookmarks: updatedBookmarks };
    });
  }, [stopBookmarksIds]);

  const item = stopBookmarks.get(id);

  if (item) {
    const name =
      item?.type === "ttc-subway" && id
        ? (subwayDbSelectors.selectById(store.getState().subwayDb, id)?.stop
            ?.name ?? item.name)
        : item?.name;
    return (
      <EtaCard
        direction={item.direction}
        enabled={item.enabled}
        id={id.toString()}
        etas={[]}
        lines={item.lines}
        name={name}
        editable
        onDelete={checkBookmarkStatus}
        stopUrl={
          item.type === "ttc-subway"
            ? `/ttc/lines/${item.lines[0]}/${item.stopId}`
            : `/stops/${item.stopId}`
        }
      />
    );
  }
}
