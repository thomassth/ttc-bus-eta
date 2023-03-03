// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "../App";
import { Settings } from "../components/settings/Settings";
import About from "./About";
import Error from "./Error";
import Home from "./Home";
import Line from "./Line";
import LineSearch from "./LineSearch";
import StopPrediction from "./StopPrediction";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="lines" element={<Outlet />}>
        <Route path=":lineId" element={<Outlet />}>
          <Route index element={<Line />} />
        </Route>
        <Route index element={<LineSearch />} />
      </Route>
      <Route path="stops" element={<Outlet />}>
        <Route path=":stopId" element={<StopPrediction />} />
      </Route>
      <Route path="about" element={<About />} />
      <Route path="settings" element={<Settings />} />
      <Route path="*" element={<Error />} />
      <Route index element={<Home />} />
    </Route>
  ),
  // TODO: use objects?
  // [
  //   {
  //     path: "/",
  //     element: <App />,
  //     children: [
  //       {
  //         path: "lines",
  //         element: <LineSearch />,
  //         children: [
  //           {
  //             path: ":lineId",
  //             element: <Line />,
  //             children: [{ path: ":stopNum", element: <LineStopPrediction /> }],
  //           },
  //         ],
  //       },
  //       {
  //         path: "stops",
  //         children: [{ path: ":stopId", element: <StopPrediction /> }],
  //       },
  //       {
  //         path: "about",
  //         element: <About />,
  //       },
  //       {
  //         path: "bookmark",
  //         element: <Bookmark />,
  //       },
  //       {
  //         path: "*",
  //         element: <Error />,
  //       },
  //     ],
  //   },
  // ],
  {
    basename: `${process.env.PUBLIC_URL}`,
  }
);
