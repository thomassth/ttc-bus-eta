import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { store } from "./app/store";
import { saveState } from "./features/bookmarks/localstorage";
import "./i18n/i18n";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { router } from "./routes/MainRouter";
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
  saveState(store.getState().stopBookmarks);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
