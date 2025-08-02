import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from "@fluentui/react-components";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import type { StopWithDistance } from "../../models/db.js";
import type {
  EtaPredictionJson,
  RouteJson,
  RoutesJson,
} from "../../models/etaJson.js";
import type {
  StopBookmark,
  settingsRedux,
  stopBookmarksRedux,
} from "../../models/etaObjects.js";
import type {
  parsedVehicleLocation,
  SubwayStations,
  SubwayStop,
} from "../../models/ttc.js";
import { store } from "../../store/index.js";
import { settingsSelectors } from "../../store/settings/slice.js";
import { fluentStyles } from "../../styles/fluent.js";

export default function RawDisplay(props: {
  data:
    | stopBookmarksRedux
    | parsedVehicleLocation
    | StopBookmark[]
    | EtaPredictionJson
    | RouteJson
    | RoutesJson
    | SubwayStations
    | SubwayStop
    | settingsRedux
    | StopWithDistance[];
}) {
  const fluentStyle = fluentStyles();
  const { t } = useTranslation();

  const devModeValue = settingsSelectors.selectById(
    store.getState().settings,
    "devMode"
  );
  const isInDevMode = useMemo(
    () => (devModeValue ? devModeValue.value === "true" : false),
    [devModeValue]
  );

  const rawDisplay = (
    <Accordion collapsible className="raw-display">
      <AccordionItem value="raw">
        <AccordionHeader className={fluentStyle.accordionHeader}>
          {t("debug.showResponse")}
        </AccordionHeader>
        <AccordionPanel>
          <pre>{JSON.stringify(props.data, null, 1)}</pre>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );

  return isInDevMode ? rawDisplay : null;
}
