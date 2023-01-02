import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { MainRouter } from "./routes/MainRouter";
import { FluentTheme } from "./styles/FluentTheme";
import { createRoot } from "react-dom/client";
import React from "react";
import { store } from "./app/store";
import { Provider } from "react-redux";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <FluentTheme>
        <MainRouter />
      </FluentTheme>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
