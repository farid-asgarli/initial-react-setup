import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./containers/layout/Layout";
import { HistoryRouterProps, unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { urlPrefix } from "./global";
import { store, StoreContext } from "./store/store";
import "./styles/global.css";

export const history: HistoryRouterProps["history"] = createBrowserHistory({
  window,
}) as any;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <HistoryRouter basename={urlPrefix} history={history}>
      <StoreContext.Provider value={store}>
        <Layout />
      </StoreContext.Provider>
    </HistoryRouter>
  </React.StrictMode>
);
