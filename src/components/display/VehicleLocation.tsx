import { Text, Title1, Title2 } from "@fluentui/react-components";
import { Point } from "ol/geom";
import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import { useEffect, useState } from "react";
import { RFeature, RLayerVector, RMap, ROSMWebGL, ROverlay } from "rlayers";
import { RView } from "rlayers/RMap";

import arrow from "../../../public/arrow.svg";
import { parsedVehicleLocation } from "../../models/ttc";
import styles from "./vehicleLoaction.module.css";

export default function VehicleLocation(props: {
  stopId?: number;
  vehicleId?: number;
  data: parsedVehicleLocation;
}) {
  const data = props.data;
  const [error, setError] = useState(false);
  const [center, setCenter] = useState([-8827495.913945649, 5436686.505484939]);
  const [view, setView] = useState<RView>({ center, zoom: 16 });

  useEffect(() => {
    if (data && data.vehicle) {
      const latlong = fromLonLat([data.vehicle?.lon, data.vehicle?.lat]);
      setCenter(latlong);
      setView({ center: latlong, zoom: 16 });
    }
  }, [data]);

  useEffect(() => {
    if (props.data?.Error) {
      setError(true);
    }
    if (data.vehicle) {
      const center = fromLonLat([data.vehicle?.lon, data.vehicle?.lat]);
      setView({ center, zoom: 16 });
    }
  }, []);

  if (error) {
    return (
      <main>
        <Title2>Error: {data.Error?.content}</Title2>
      </main>
    );
  }

  return (
    <div className="vehicleView">
      <RMap
        width={"100%"}
        height={"60vh"}
        initial={{ center, zoom: 11 }}
        view={[view, setView]}
      >
        <ROSMWebGL />
        <RLayerVector zIndex={10}>
          <RFeature geometry={new Point(center)}>
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
        </RLayerVector>
      </RMap>
      <div className={styles.desc}>
        <Title1>Route: {data.vehicle?.line}</Title1>
        <Title2>Bus ID: {data.vehicle?.id}</Title2>
        <Text>Speed: {data.vehicle?.speedKmHr}km/h</Text>
        <Text>Heading: {data.vehicle?.heading}</Text>
      </div>
    </div>
  );
}
