import { Button, Spinner, Switch, Tooltip } from "@fluentui/react-components";
import { Info16Regular } from "@fluentui/react-icons";
import { useCallback, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import useNavigate from "../../routes/navigate.js";
import { store, useAppDispatch } from "../../store/index.js";
import {
  changeSettings,
  settingsSelectors,
} from "../../store/settings/slice.js";
import { addStops, getSize } from "../../store/ttcStopsDb.js";
import StopSearch from "../search/StopSearch.js";
import style from "./Nearby.module.css";
import NearbyList from "./NearbyList.js";

export default function Nearby() {
  const { t } = useTranslation();

  const [number, setNumber] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [coordinate, setCoordinate] = useState<{ lat?: number; lon?: number }>(
    {}
  );

  const { navigate } = useNavigate();

  const onSearchSubmit = useCallback(
    (input: string) => {
      navigate(`stops/${input}`);
    },
    [navigate]
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
      setNumber(result);
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
        setNumber(result);
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
      <section className="item-info-placeholder">
        <StopSearch onValidSubmit={onSearchSubmit} />
      </section>
      {number >= 0
        ? t("nearby.totalStopsSummary", { stopsTotal: number })
        : t("nearby.checkingDb")}
      <div className={style["nearby-controls"]}>
        <Button onClick={handleRefresh}>
          {isLoading ? t("nearby.checkingDb") : t("nearby.checkDb")}
        </Button>
        <Button onClick={handleGeolocation}>
          {isLoadingLocation
            ? t("nearby.checkingLocation")
            : coordinate.lat && coordinate.lon
            ? t("nearby.recheckLocation")
            : t("nearby.checkLocation")}
        </Button>
        <div className={style.spinner}>
          {(isLoading || isLoadingLocation) && <Spinner />}
        </div>
      </div>
      <div>
        <Switch
          checked={locationMode}
          onChange={locationModeChange}
          label={t("nearby.alwaysProvideLocation")}
        />
        <Tooltip
          content={{
            children: <Trans>nearby.locationPolicy</Trans>,
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
