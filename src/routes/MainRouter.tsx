// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "../App";
import Bookmark from "../features/bookmarks/bookmark";
import About from "./About";
import Error from "./Error";
import Home from "./Home";
import Line from "./Line";
import LineSearch from "./LineSearch";
import LineStopPrediction from "./LineStopPrediction";
import StopPrediction from "./StopPrediction";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="lines" element={<Outlet />}>
        <Route path=":lineId" element={<Line />}>
          <Route path=":stopNum" element={<LineStopPrediction />} />
        </Route>
        <Route index element={<LineSearch />} />
      </Route>
      <Route path="stops" element={<Outlet />}>
        <Route path=":stopId" element={<StopPrediction />} />
      </Route>
      <Route path="about" element={<About />} />
      <Route path="bookmark" element={<Bookmark />} />
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
