import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Text,
} from "@fluentui/react-components";
import { useTranslation } from "react-i18next";

import { EtaPredictionXml, RouteXml } from "../data/EtaXml";

export default function RawDisplay(props: {
  data: EtaPredictionXml | RouteXml;
}) {
  const { t } = useTranslation();

  return (
    <Accordion collapsible>
      <AccordionItem value="raw">
        <AccordionHeader>{t("debug.showResponse")}</AccordionHeader>
        <AccordionPanel>
          <Text>{JSON.stringify(props.data, null, 4)}</Text>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
