import { Button, Title1 } from "@fluentui/react-components";
import { ArrowClockwise24Regular } from "@fluentui/react-icons";
import { Suspense, lazy, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { getVehicleLocation } from "../components/fetch/fetchUtils.js";
import { fluentStyles } from "../styles/fluent.js";
import styles from "./RelativeVehiclePosition.module.css";

const VehicleLocation = lazy(
  () => import("../components/display/VehicleLocation.js")
);

export default function RelativeVehiclePosition() {
  const params = useParams();
  const stopNum = parseInt(`${params.stopId}`);
  const vehicleId = parseInt(`${params.vehicle}`);
  const [data, setData] = useState({});

  useEffect(() => {
    document.title = `Stop ID ${stopNum} | TTC arrivals`;
  });
  useEffect(() => {
    updateData();
  }, []);

  const updateData = (vehicle: number = vehicleId) => {
    getVehicleLocation(vehicle, {}).then((res) => {
      setData(res);
    });
  };

  return (
    <main className={styles["relative-vehicle-position"]}>
      <Title1>Vehicle {vehicleId}</Title1>
      <RefreshButton onClick={() => updateData()} />
      <Suspense>
        <VehicleLocation stopId={stopNum} vehicleId={vehicleId} data={data} />
      </Suspense>
    </main>
  );
}

function RefreshButton({ onClick }: { onClick: () => void }) {
  const fluentStyle = fluentStyles();
  const { t } = useTranslation();

  const useOnClick = () => {
    onClick();
  };

  return (
    <Button
      className={fluentStyle.refreshButton}
      onClick={useOnClick}
      icon={<ArrowClockwise24Regular />}
    >
      {t("buttons.refresh")}
    </Button>
  );
}
