import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import { App } from "../App"
import LineSearch from "./LineSearch"
import Line from "./Line"
import Error from "./Error"
import LineStopPrediction from "./LineStopPrediction"
import Home from "./Home"
import StopPrediction from "./StopPrediction"

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<Home />} />
          <Route path="lines" element={<Outlet/>}>
            <Route index element={<LineSearch />} />
            <Route path=":lineId" element={<Line />} >
              <Route path=":stopNum" element={<LineStopPrediction />} />
            </Route>
          </Route>
          <Route path="stops" element={<Outlet/>}>
            <Route path=":stopId" element={<StopPrediction/>}/>
          </Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}