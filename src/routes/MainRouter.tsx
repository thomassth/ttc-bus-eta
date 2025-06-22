import { createBrowserRouter } from "react-router-dom";

import App from "../App.js";
import { BookmarkPage } from "../components/bookmarks/Bookmark.js";
import { Settings } from "../components/settings/Settings.js";
import YRTHeader from "../lab/YRTheader.js";
import YRTLine from "../lab/YRTline.js";
import YRTLines from "../lab/YRTlines.js";
import YRT from "../lab/YRTstop.js";
import About from "./About.js";
import ErrorPage from "./Error.js";
import Home from "./Home.js";
import Line from "./Line.js";
import LineSearch from "./LineSearch.js";
import LineStopPrediction from "./LineStopPrediction.js";
import RelativeVehiclePosition from "./RelativeVehiclePosition.js";
import StopPrediction from "./StopPrediction.js";

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
          { index: true, Component: YRTLines },
          { path: "lines/:lineId", Component: YRTLine },
          {
            path: "stops/:stopId",
            Component: YRT,
          },
        ],
        errorElement: <ErrorPage />,
      },
      {
        path: "ttc",
        children: [
          { index: true, Component: LineSearch },
          {
            path: "lines/:lineId",
            children: [
              { index: true, Component: Line },
              { path: ":stopNum", Component: LineStopPrediction },
            ],
          },
          {
            path: "stops/:stopId",
            children: [
              { index: true, Component: StopPrediction },
              {
                path: ":vehicle",
                Component: RelativeVehiclePosition,
              },
            ],
          },
        ],
        errorElement: <ErrorPage />,
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
        errorElement: <ErrorPage />,
      },
      {
        path: "stops/:stopId",
        children: [
          { index: true, Component: StopPrediction },
          {
            path: ":vehicle",
            Component: RelativeVehiclePosition,
          },
        ],
        errorElement: <ErrorPage />,
      },

      { path: "*", Component: ErrorPage },
    ],
  },
]);
