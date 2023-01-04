import { Link, Title1 } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import "./App.css";
import { BottomBar } from "./components/nav/BottomBar";

export const App = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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
        <Link href={`${process.env.PUBLIC_URL}/`} title="Return home">
          <Title1 className="text-xl font-bold">TTC arrivals</Title1>
        </Link>
        {dimensions.width >= 800 && <div />}
      </div>
      <Outlet />
      {dimensions.width < 800 && <div className="nav-buffer"></div>}
      {/* {(dimensions.width < 800) && <BottomBar />} */}
      <BottomBar />
    </div>
  );
};
