import { Link, Title1 } from "@fluentui/react-components";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";

import "./App.css";
import { BottomBar } from "./components/nav/BottomBar";

function App() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { t } = useTranslation();

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);
  return (
    <div className="container">
      <div className="navBar">
        <Link
          href={`${process.env.PUBLIC_URL}/`}
          title={t("home.title.tooltip") || ""}
        >
          <Title1 className="text-xl font-bold">{t("home.title.name")}</Title1>
        </Link>
        {dimensions.width >= 800 && <div />}
      </div>
      <Outlet />
      {dimensions.width < 800 && <div className="nav-buffer" />}
      {/* {(dimensions.width < 800) && <BottomBar />} */}
      <BottomBar />
    </div>
  );
}

export default App;
