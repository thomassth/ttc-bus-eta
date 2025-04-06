import { Link as LinkFluent, Title1 } from "@fluentui/react-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";

import "./App.css";
import { NavBar } from "./components/nav/NavBar.js";

function App() {
  const queryClient = new QueryClient();

  const [width, setWidth] = useState(window.innerWidth);
  const { t } = useTranslation();

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    window.addEventListener("orientationchange", handleResize, false);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <header className="nav-bar">
          <Link
            className="router-link"
            to={"/"}
            title={t("home.title.tooltip") ?? ""}
          >
            <LinkFluent>
              <Title1 className="app-title text-xl font-bold">
                {t("home.title.name")}
              </Title1>
            </LinkFluent>
          </Link>
          {width >= 800 && <NavBar width={width} />}
        </header>
        <Outlet />
        {width < 800 && <NavBar width={width} />}
      </div>
    </QueryClientProvider>
  );
}

export default App;
