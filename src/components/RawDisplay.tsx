import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from "@fluentui/react-components";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "../app/hooks";
import { store } from "../app/store";
import { EtaPredictionXml, RouteXml } from "../data/etaXml";
import {
  settingsItem,
  settingsSelectors,
} from "../features/settings/settingsSlice";
import { fluentStyles } from "../styles/fluent";

export default function RawDisplay(props: {
  data:
    | EtaPredictionXml
    | RouteXml
    | { ids: string[]; entities: settingsItem[] };
}) {
  const fluentStyle = fluentStyles();
  const { t } = useTranslation();

  const isLocalDevMode = useMemo(
    () => process.env.NODE_ENV === "development",
    [process.env.NODE_ENV]
  );
  const settings: { id: number[]; entities: settingsItem[] } = useAppSelector(
    (state) => state.settings
  );

  const devModeValue = settingsSelectors.selectById(
    store.getState().settings,
    "devMode"
  );
  const isInDevMode = useMemo(
    () => (devModeValue !== undefined ? devModeValue.value === "true" : false),
    [settings]
  );
  const shouldDisplayDev = isInDevMode || isLocalDevMode;

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

  return shouldDisplayDev ? rawDisplay : <> {}</>;
}
