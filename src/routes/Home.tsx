import { Button, Input } from "@fluentui/react-components";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import EtaCardContainer from "../components/etaCard/EtaCardContainer";
import { multiRouteDataEndpoint } from "../constants/dataEndpoints";
import { FavouriteEtaRedux } from "../models/favouriteEta";
import { useAppSelector } from "../store";
import { fluentStyles } from "../styles/fluent";
import useNavigate from "./navigate";

export default function Home() {
  const [input, setInput] = useState("");
  const [dataUrl, setDataUrl] = useState("");
  const { t } = useTranslation();
  const { navigate } = useNavigate();
  const fluentStyle = fluentStyles();
  const favouriteEtas: FavouriteEtaRedux = useAppSelector(
    (state) => state.favouriteEtas
  );

  useEffect(() => {
    let urlParams = "";

    favouriteEtas.ids.forEach((eta) => {
      urlParams = urlParams.concat(
        `&stops=${favouriteEtas.entities[eta].routeTag}|${favouriteEtas.entities[eta].stopTag}`
      );
    });

    if (urlParams === "") return;

    setDataUrl(multiRouteDataEndpoint.concat(urlParams));
  }, [favouriteEtas.ids]);

  const handleLineChange = useCallback(
    (e: { currentTarget: { value: SetStateAction<string> } }) => {
      setInput(e.currentTarget.value);
    },
    []
  );

  const handleSearchClick = useCallback(() => {
    if (input === "") return;

    navigate(`lines/${input}`);
  }, [input]);

  return (
    <main className="homePage">
      <form className="searchBlock">
        <Input
          value={input}
          className={fluentStyle.flexGrowContent}
          onChange={handleLineChange}
          aria-label={t("lines.ariaLabel") || ""}
          placeholder={t("lines.placeholder") || ""}
        />
        <Button appearance="primary" type="submit" onClick={handleSearchClick}>
          {t("buttons.search")}
        </Button>
      </form>
      <EtaCardContainer dataUrl={dataUrl} shdFilterNonFavourite />
    </main>
  );
}
