import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";

import { saveStopBookmarkState } from "./features/bookmarks/localstorage";
import { saveSettingsState } from "./features/settings/localstorage";
import "./i18n/i18n";
import "./index.css";
import { store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import { router } from "./routes/MainRouter";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { FluentTheme } from "./styles/FluentTheme";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <FluentTheme>
          <RouterProvider router={router} />
        </FluentTheme>
      </Provider>
    </React.StrictMode>
  );
}

store.subscribe(() => {
  saveStopBookmarkState(store.getState().stopBookmarks);
  saveSettingsState(store.getState().settings);
});
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
