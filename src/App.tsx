import { Title1 } from "@fluentui/react-components";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";

import "./App.css";
import { BottomBar, SideBar } from "./components/nav/NavBar";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const { t } = useTranslation();

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  return (
    <div className="container">
      <header className="navBar">
        <Link
          className="appTitle"
          to={"/"}
          title={t("home.title.tooltip") || ""}
        >
          <Title1 className="text-xl font-bold">{t("home.title.name")}</Title1>
        </Link>
        <SideBar width={width} />
      </header>
      <Outlet />
      <BottomBar width={width} />
    </div>
  );
}

export default App;
