import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from "@fluentui/react-components";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { EtaPredictionXml, RouteXml } from "../data/etaXml";
import { fluentStyles } from "../styles/fluent";

export default function RawDisplay(props: {
  data: EtaPredictionXml | RouteXml;
}) {
  const fluentStyle = fluentStyles();
  const { t } = useTranslation();

  const isLocalDevMode = useMemo(
    () => process.env.NODE_ENV === "development",
    [process.env.NODE_ENV]
  );

  const rawDisplay = (
    <Accordion collapsible>
      <AccordionItem value="raw">
        <AccordionHeader className={fluentStyle.accordionHeader}>
          {t("debug.showResponse")}
        </AccordionHeader>
        <AccordionPanel className="rawResponseDetails">
          <pre>{`${JSON.stringify(props.data, null, 1)}`}</pre>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );

  return isLocalDevMode ? rawDisplay : <></>;
}
