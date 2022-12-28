import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { App } from "../App";
import LineSearch from "./LineSearch";
import Line from "./Line";
import Error from "./Error";
import LineStopPrediction from "./LineStopPrediction";
import Home from "./Home";
import StopPrediction from "./StopPrediction";
import About from "./About";

export const MainRouter = () => {
  return (
    <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
      <Routes>
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
          <Route path="about" element={<About />}></Route>
          <Route path="*" element={<Error />} />
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
