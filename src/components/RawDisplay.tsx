import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from "@fluentui/react-components";
import { useTranslation } from "react-i18next";

import { EtaPredictionXml, RouteXml } from "../data/etaXml";

export default function RawDisplay(props: {
  data: EtaPredictionXml | RouteXml;
}) {
  const { t } = useTranslation();

  return (
    <Accordion collapsible>
      <AccordionItem value="raw">
        <AccordionHeader>{t("debug.showResponse")}</AccordionHeader>
        <AccordionPanel className="rawResponse">
          <pre>{`${JSON.stringify(props.data, null, 1)}`}</pre>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
