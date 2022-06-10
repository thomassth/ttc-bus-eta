import { BrowserRouter, Routes, Route } from "react-router-dom"
import { App } from "../App"
import LineSearch from "./LineSearch"
import Line from "./Line"
import Lines from "./Lines"
import Error from "./Error"

export const MainRouter = () => {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} >
              <Route path="lines" element={<Lines />}>
                <Route index element={<LineSearch/>}/>
                <Route path=":lineId" element={<Line />} />
              </Route>
              <Route path="*" element={<Error/>}/>
              <Route index element={<LineSearch />} />
            </Route>
          </Routes>
        </BrowserRouter>
    )
  }