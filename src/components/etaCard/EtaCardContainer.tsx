import { Text, Title1 } from "@fluentui/react-components";
import { t } from "i18next";
import { useCallback, useEffect, useState } from "react";
import { Trans } from "react-i18next";

import { EtaPredictionXml } from "../../models/etaXml";
import { BranchEta, FavouriteEtaRedux } from "../../models/favouriteEta";
import { useAppSelector } from "../../store";
import RawDisplay from "../rawDisplay/RawDisplay";
import { FetchXMLWithCancelToken } from "../utils/fetchUtils";
import { extractEtaDataFromXml } from "../utils/xmlParserUtils";
import { EtaCard } from "./EtaCard";

export default function EtaCardContainer(props: {
  dataUrl: string;
  shdShowTitle?: boolean;
  shdFilterNonFavourite?: boolean;
  stopId?: string;
}) {
  const [rawEta, setRawEta] = useState<EtaPredictionXml>();
  const [processedEtaList, setProcessedEtaList] = useState<BranchEta[]>([]);
  const [etaCards, setEtaCards] = useState<JSX.Element[]>();
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

  const Title = useCallback(() => {
    return processedEtaList[0] !== undefined && props.shdShowTitle ? (
      <Title1 className="top-row">{processedEtaList[0].stopTitle}</Title1>
    ) : null;
  }, [processedEtaList]);

  const EtaCards = useCallback(() => {
    switch (true) {
      case processedEtaList.length === 0:
        return (
          <section className="itemInfoPlaceholder">
            <Text>
              <Trans>{t("home.etaReminder")}</Trans>
            </Text>
          </section>
        );
      case etaCards === undefined || etaCards.length === 0:
        return (
          <section className="itemInfoPlaceholder">
            <Text>{t("home.homeNoEta")}</Text>
          </section>
        );
      case etaCards && etaCards.length > 0:
        return (
          <div>
            <ul className="etaCardList">{etaCards}</ul>
          </div>
        );
      default:
        return <></>;
    }
  }, [etaCards]);

  return (
    <div className="etaCardContainer">
      <Title />
      <EtaCards />
      <RawDisplay data={rawEta} />
    </div>
  );
}
