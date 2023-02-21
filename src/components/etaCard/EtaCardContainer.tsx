import { Text, Title1 } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import { EtaPredictionXml } from "../../models/etaXml";
import { BranchEta, FavouriteEtaRedux } from "../../models/favouriteEta";
import { useAppSelector } from "../../store";
import { FetchXMLWithCancelToken } from "../fetch/fetchUtils";
import { extractEtaDataFromXml } from "../parser/multiStopParser";
import RawDisplay from "../rawDisplay/RawDisplay";
import { EtaCard } from "./EtaCard";

export default function EtaCardContainer(props: {
  dataUrl: string;
  shdShowTitle?: boolean;
  shdFilterNonFavourite?: boolean;
  stopId?: string;
}) {
  const { t } = useTranslation();
  const [rawEta, setRawEta] = useState<EtaPredictionXml>();
  const [processedEtaList, setProcessedEtaList] = useState<BranchEta[]>([]);
  const [etaCards, setEtaCards] = useState<JSX.Element[]>();
  const [lastUpdatedAt, setLastUpdatedAt] = useState<number>(0);
  const favouriteEtas: FavouriteEtaRedux = useAppSelector(
    (state) => state.favouriteEtas
  );

  useEffect(() => {
    const controller = new AbortController();

    const fetchEtaData = async () => {
      const { parsedData, error } = await FetchXMLWithCancelToken(
        props.dataUrl,
        {
          signal: controller.signal,
          method: "GET",
        }
      );

      return { parsedData, error };
    };

    if (props.dataUrl.length > 0) {
      fetchEtaData().then(({ parsedData, error }) => {
        if (error || !parsedData) {
          return;
        }

        setRawEta(parsedData);
        setLastUpdatedAt(Date.now());
        setProcessedEtaList(extractEtaDataFromXml(parsedData));
      });
    }

    return () => {
      controller.abort();
    };
  }, [props.dataUrl]);

  useEffect(() => {
    const result = processedEtaList.flatMap((eta) => {
      if (!eta.branchTag) return [];

      const key = `${eta.branchTag}-${eta.stopTag}`;
      if (props.shdFilterNonFavourite) {
        if (!favouriteEtas.ids.includes(key)) return [];

        eta.stopId = favouriteEtas.entities[key].stopId;
      }

      return (
        <li key={key}>
          <EtaCard eta={eta} stopId={props.stopId} />
        </li>
      );
    });

    setEtaCards(result);
  }, [processedEtaList]);

  return (
    <div className="bookmarkContainer">
      {processedEtaList[0] !== undefined && props.shdShowTitle ? (
        <Title1 className="top-row">{processedEtaList[0].stopTitle}</Title1>
      ) : null}
      {etaCards === undefined || etaCards.length === 0 ? (
        <section className="itemInfoPlaceholder">
          <Trans>{t("home.headline")}</Trans>
          <Text>{t("home.bookmarkReminder")}</Text>
        </section>
      ) : etaCards && etaCards.length > 0 ? (
        <div>
          <ul>{etaCards}</ul>
        </div>
      ) : lastUpdatedAt > 0 ? (
        <section>
          <p>{t("home.homeNoEta")}</p>
        </section>
      ) : null}
      {rawEta !== undefined && <RawDisplay data={rawEta} />}
    </div>
  );
}
