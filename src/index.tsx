import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import "./i18n/i18n";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { router } from "./routes/MainRouter";
import { register } from "./serviceWorkerRegistration";
import { store } from "./store";
import { saveFavouriteEtasState } from "./store/favourites/state";
import { saveSettingsState } from "./store/settings/state";
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
  saveSettingsState(store.getState().settings);
  saveFavouriteEtasState(store.getState().favouriteEtas);
});
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
