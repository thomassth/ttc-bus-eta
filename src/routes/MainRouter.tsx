// eslint-disable-next-line no-unused-vars
import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import { BookmarkPage } from "../components/bookmarks/Bookmark";
import { Settings } from "../components/settings/Settings";
import YRT from "../lab/YRT";
import YRTHeader from "../lab/YRTheader";
import About from "./About";
import Error from "./Error";
import Home from "./Home";
import Line from "./Line";
import LineSearch from "./LineSearch";
import LineStopPrediction from "./LineStopPrediction";
import StopPrediction from "./StopPrediction";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "bookmarks", Component: BookmarkPage },
      { path: "settings", Component: Settings },
      {
        path: "yrt",
        Component: YRTHeader,
        children: [
          {
            path: "stops/:stopId",
            Component: YRT,
          },
        ],
      },
      {
        path: "lines",
        children: [
          { index: true, Component: LineSearch },
          {
            path: ":lineId",
            children: [
              { index: true, Component: Line },
              { path: ":stopNum", Component: LineStopPrediction },
            ],
          },
        ],
      },
      {
        path: "stops/:stopId",
        Component: StopPrediction,
      },

      { path: "*", Component: Error },
    ],
  },
]);
