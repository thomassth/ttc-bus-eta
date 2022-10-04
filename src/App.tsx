import "./App.css";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Anchor, Nav as BottomNav } from "grommet";
import { Link, Title1 } from "@fluentui/react-components";

const navItems = [
  {
    label: "Home",
    href: `${process.env.PUBLIC_URL}/`,
  },
  {
    label: "Lines",
    href: `${process.env.PUBLIC_URL}/lines`,
  },
  {
    label: "About",
    href: `${process.env.PUBLIC_URL}/about`,
  },
];

export const App = (props: any) => {
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
          <Title1 className="text-xl font-bold">TTC bus app</Title1>
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

const BottomBar = () => {
  const nav: JSX.Element[] = [];
  navItems.forEach((item, index) => {
    if (item.href === window.location.pathname) {
      nav.push(
        <Anchor
          key={index}
          href={item.href}
          label={item.label}
          className="active"
        />
      );
    } else {
      nav.push(<Anchor key={index} label={item.label} href={item.href} />);
    }
  });
  return (
    <BottomNav className="bottomNav" gap="medium" direction="row">
      {nav}
    </BottomNav>
  );
};
