import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { MainRouter } from "./routes/MainRouter";
import { ThemeHook } from "./styles/ThemeHook";
import { createRoot } from "react-dom/client";

// Inject some global styles

// const commonStyles = makeStyles({
//   ':global(body,html,#root>*)': {
//     margin: 0,
//     padding: 0,
//     minHeight: '100vh',
//   },
// })

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ThemeHook>
    <MainRouter />
  </ThemeHook>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
