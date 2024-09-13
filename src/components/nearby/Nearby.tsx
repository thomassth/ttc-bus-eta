import { Button, Spinner, Switch, Tooltip } from "@fluentui/react-components";
import { Info16Regular } from "@fluentui/react-icons";
import { useCallback, useEffect, useState } from "react";

import { store, useAppDispatch } from "../../store/index.js";
import {
  changeSettings,
  settingsSelectors,
} from "../../store/settings/slice.js";
import { addStops, getSize } from "../../store/ttcRouteDb.js";
import style from "./Nearby.module.css";
import NearbyList from "./NearbyList.js";

export default function Nearby() {
  const [number, useNumber] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [coordinate, setCoordinate] = useState<{ lat?: number; lon?: number }>(
    {}
  );

  const defaultProvideLocationValue = settingsSelectors.selectById(
    store.getState().settings,
    "defaultProvideLocation"
  );
  const [locationMode, setLocationMode] = useState(
    typeof defaultProvideLocationValue !== "undefined"
      ? defaultProvideLocationValue.value === "true"
      : false
  );
  const dispatch = useAppDispatch();
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false);

  useEffect(() => {
    getSize().then((result) => {
      useNumber(result);
    });
  });

  const handleRefresh = useCallback(async () => {
    setIsLoading(true);

    const response = await fetch(
      "https://thomassth.github.io/to-bus-stations/data/ttc/stops.json"
    );
    const data = await response.json();

    addStops(data).then(() => {
      setIsLoading(false);
      getSize().then((result) => {
        useNumber(result);
      });
    });
  }, []);

  const handleGeolocation = useCallback(async () => {
    const number = await getSize();
    if (number <= 0) {
      await handleRefresh();
    }

    if ("geolocation" in navigator) {
      setIsLoadingLocation(true);
      navigator.geolocation.getCurrentPosition((position) => {
        setCoordinate({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setIsLoadingLocation(false);
      });
    }
  }, []);

  useEffect(() => {
    if (locationMode) {
      handleGeolocation();
    }
  }, []);

  const locationModeChange = useCallback(
    (ev: {
      currentTarget: { checked: boolean | ((prevState: boolean) => boolean) };
    }) => {
      const valueString = ev.currentTarget.checked.toString();
      setLocationMode(ev.currentTarget.checked);
      dispatch(
        changeSettings({
          id: "defaultProvideLocation",
          name: "defaultProvideLocation",
          value: valueString,
        })
      );
    },
    [setLocationMode]
  );

  return (
    <div className={style.nearby}>
      {number >= 0
        ? `There are ${number} stops in the local database.`
        : "Checking database ... "}
      <div className={style["nearby-controls"]}>
        <Button onClick={handleRefresh}>
          {isLoading ? "reloading..." : "Refresh database"}
        </Button>
        <Button onClick={handleGeolocation}>
          {isLoadingLocation
            ? "Checking your location..."
            : coordinate.lat && coordinate.lon
              ? "Refresh my location"
              : "Set my location"}
        </Button>
        <div className={style.spinner}>
          {(isLoading || isLoadingLocation) && <Spinner />}
        </div>
      </div>
      <div>
        <Switch
          checked={locationMode}
          onChange={locationModeChange}
          label="Provide my locations on load"
        />
        <Tooltip
          content={{
            children: (
              <p>
                Even though we do not send your location to the internet, you
                still have a choice to only use your location when you want.
                <br />
                For convenience, you can provide your location automatically
                when you load TOBus.ca.
              </p>
            ),
          }}
          relationship={"label"}
          mountNode={document.querySelector("#root .fui-FluentProvider")}
          withArrow
        >
          <Info16Regular />
        </Tooltip>
      </div>
      <NearbyList coordinate={coordinate} />
    </div>
  );
}
