import { Link as LinkFluent, Title1 } from "@fluentui/react-components";
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";

import "./App.css";
import { NavBar } from "./components/nav/NavBar.js";
import { StopBookmark } from "./models/etaObjects.js";
import { useSettingsStore } from "./store/settingsStore.js";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const { t } = useTranslation();

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    window.addEventListener("orientationchange", handleResize, false);
  }, []);
  const setSettings = useSettingsStore((state) => state.setSettings);

  // migrate stored settings from redux to zustand
  useEffect(() => {
    // appSettings
    const oldSettings = localStorage.getItem("appSettings");

    if (oldSettings) {
      const parsedSettings = JSON.parse(oldSettings);
      console.log("Parsed settings:", parsedSettings);
      const newSettings = Object.keys(parsedSettings.entities).reduce(
        (acc, key) => {
          acc[key] = parsedSettings.entities[key].value;
          return acc;
        },
        {
          unifiedEta: true,
          devMode: false,
          defaultHomeTab: "favourites",
          defaultProvideLocation: false,
        }
      );
      Object.keys(newSettings).forEach((key) => {
        if (newSettings[key] === "true") {
          newSettings[key] = true;
        } else if (newSettings[key] === "false") {
          newSettings[key] = false;
        }
      });
      console.log("New settings:", newSettings);
      // store settings in zustand
      setSettings(newSettings);
      localStorage.removeItem("appSettings");
    }
    // console.log(useSettingsStore.getState().stopBookmarks);

    // stopBookmarks
    const oldStopBookmarks = localStorage.getItem("stopBookmarks");

    if (oldStopBookmarks) {
      const parsedStopBookmarks: { ids: [] } = JSON.parse(oldStopBookmarks);
      console.log("Parsed stop bookmarks:", parsedStopBookmarks);
      const newStopBookmarks =
        parsedStopBookmarks?.ids.map(
          (id) => parsedStopBookmarks.entities[id]
        ) ?? [];

      // create a new Map from the stop bookmarks
      const stopBookmarksMap = new Map<number, StopBookmark>();
      for (let i = 0; i < newStopBookmarks.length; i++) {
        stopBookmarksMap.set(
          parseInt(parsedStopBookmarks.ids[i]),
          newStopBookmarks[i]
        );
      }
      console.log("New stop bookmarks:", stopBookmarksMap);
      // store stop bookmarks in zustand
      useSettingsStore.setState((prev) => ({
        stopBookmarks: new Map(stopBookmarksMap),
      }));

      console.log(useSettingsStore.getState().stopBookmarks);

      // localStorage.removeItem("stopBookmarks");
      // store stop bookmarks in zustand
    }
  }, []);

  return (
    <div className="container">
      <header className="nav-bar">
        <Link
          className="router-link"
          to={"/"}
          title={t("home.title.tooltip") ?? ""}
        >
          <LinkFluent>
            <Title1 className="app-title text-xl font-bold">
              {t("home.title.name")}
            </Title1>
          </LinkFluent>
        </Link>
        {width >= 800 && <NavBar width={width} />}
      </header>
      <Outlet />
      {width < 800 && <NavBar width={width} />}
    </div>
  );
}

export default App;
