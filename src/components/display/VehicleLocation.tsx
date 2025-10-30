import { Text, Title1, Title2 } from "@fluentui/react-components";
import { Point } from "ol/geom.js";
import "ol/ol.css";
import { fromLonLat } from "ol/proj.js";
import { useEffect, useState } from "react";
import { RFeature, RLayerVector, RMap, ROSMWebGL, ROverlay } from "rlayers";
import type { RView } from "rlayers/RMap";

import arrow from "../../../public/arrow.svg";
import type { parsedVehicleLocation } from "../../models/ttc.js";
import RawDisplay from "../rawDisplay/RawDisplay.js";
import styles from "./VehicleLoaction.module.css";

export default function VehicleLocation(props: {
  stopId?: number;
  vehicleId?: number;
  data: parsedVehicleLocation;
}) {
  const data = props.data;
  const [error, setError] = useState(false);
  const [vehicleCoor, setVehicleCoor] = useState<number[] | undefined>(
    undefined
  );
  const [center, setCenter] = useState<number[] | undefined>(undefined);
  const [zoom, setZoom] = useState(16);
  const [view, setView] = useState<RView>({ center, zoom: 16 });

  // store map values into react states; keep zoom & center consistent (until page reload)
  useEffect(() => {
    setCenter(view.center);
    setZoom(view.zoom);
  }, [view]);

  // set vehicle position from data
  useEffect(() => {
    if (data?.vehicle) {
      const vehiclePosition = fromLonLat([
        Number.parseFloat(data.vehicle?.lon),
        Number.parseFloat(data.vehicle?.lat),
      ]);
      setVehicleCoor(vehiclePosition);
      setView({ center: center ?? vehiclePosition, zoom });
    }
  }, [data]);

  useEffect(() => {
    if (props.data?.Error) {
      setError(true);
    }
  }, []);

  if (error) {
    return (
      <main>
        <Title2>Error: {data.Error?.content}</Title2>
      </main>
    );
  }

  const initialCoor = fromLonLat([-8827495.913945649, 5436686.505484939]);

  return (
    <div className="vehicle-view">
      <RMap
        width={"100%"}
        height={"60vh"}
        initial={{ center: initialCoor, zoom: 11 }}
        view={[view, setView]}
      >
        <ROSMWebGL />
        <RLayerVector zIndex={10}>
          {vehicleCoor && (
            <RFeature geometry={new Point(vehicleCoor)}>
              <ROverlay className="no-interaction">
                <img
                  src={arrow}
                  style={{
                    position: "relative",
                    top: -12,
                    left: -12,
                    userSelect: "none",
                    pointerEvents: "none",
                    transform: `rotate(${data.vehicle?.heading ?? 0}deg)`,
                  }}
                  width={24}
                  height={24}
                  alt="bus icon"
                />
              </ROverlay>
            </RFeature>
          )}
        </RLayerVector>
      </RMap>
      <div className={styles.desc}>
        <Title1>Route: {data.vehicle?.routeTag}</Title1>
        <Title2>Bus ID: {data.vehicle?.id}</Title2>
        <Text>Speed: {data.vehicle?.speedKmHr}km/h</Text>
        <Text>Heading: {data.vehicle?.heading}</Text>
        <Text>
          Bus location last updated {data.vehicle?.secsSinceReport}s ago
        </Text>
      </div>
      <RawDisplay data={data} />
    </div>
  );
}
