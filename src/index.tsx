import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import "./i18n/i18n";
import "./index.css";
import reportWebVitals from "./reportWebVitals.js";
import { router } from "./routes/MainRouter.js";
import { saveStopBookmarkState } from "./store/bookmarks/state.js";
import { store } from "./store/index.js";
import { saveSubwayDbState } from "./store/suwbayDb/state.js";
import { FluentTheme } from "./styles/FluentTheme.js";

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
  saveSubwayDbState(store.getState().subwayDb);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
