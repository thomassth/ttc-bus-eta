import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from "@fluentui/react-components";
import { useTranslation } from "react-i18next";

import { StopWithDistance } from "../../models/db.js";
import {
  EtaPredictionJson,
  RouteJson,
  RoutesJson,
} from "../../models/etaJson.js";
import { StopBookmark } from "../../models/etaObjects.js";
import {
  SubwayStations,
  SubwayStop,
  parsedVehicleLocation,
} from "../../models/ttc.js";
import { useSettingsStore } from "../../store/settingsStore.js";
import { fluentStyles } from "../../styles/fluent.js";

export default function RawDisplay(props: {
  data:
    | parsedVehicleLocation
    | StopBookmark[]
    | EtaPredictionJson
    | RouteJson
    | RoutesJson
    | SubwayStations
    | SubwayStop
    | StopWithDistance[];
}) {
  const fluentStyle = fluentStyles();
  const { t } = useTranslation();

  const devModeValue = useSettingsStore((state) => state.devMode);

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

  return devModeValue ? rawDisplay : <> {}</>;
}
