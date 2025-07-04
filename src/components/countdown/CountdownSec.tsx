import { Badge, Text, Title2 } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import style from "./CountdownSec.module.css";

export function CountdownSec(props: {
  second: number;
  epochTime?: number;
  vehicle?: number;
  index?: number;
}) {
  const [epochTime, setEpochTime] = useState(props.epochTime);
  const [sec, setSec] = useState(props.second ?? 0);
  const { t } = useTranslation();

  useEffect(() => {
    if (epochTime && epochTime !== props.epochTime) {
      setEpochTime(props.epochTime);
      setSec(Math.floor((epochTime - Date.now()) / 1000));
    }
    const timer = setTimeout(() => {
      if (epochTime) {
        setSec(Math.floor((epochTime - Date.now()) / 1000));
      } else {
        setSec(sec - 1);
      }
    }, 1000);
    if (sec <= 0) {
      clearTimeout(timer);
    }
    // Cleanup
    return () => clearTimeout(timer);
  }, [sec]);
  return (
    <div className={style["countdown-sec"]}>
      {(sec < 180 || props.index === 0) && (
        <ArrivingBadge vehicle={props.vehicle} />
      )}

      {sec >= 60 * 60 && (
        <>
          <Title2 className={style.number}>
            {`${Math.floor(sec / 3600)}h`}
          </Title2>
          <Text className={style.number}>
            {`${Math.floor((sec % 3600) / 60)}${t("eta.minuteShort")}`}
          </Text>
        </>
      )}

      {sec > 0 && sec < 60 * 60 && (
        <Title2 className={style.number}>
          {Math.floor(sec / 60) >= 1
            ? `${Math.floor(sec / 60)}${t("eta.minuteShort")}`
            : `${sec % 60}${t("eta.secondShort")}`}
        </Title2>
      )}

      {sec % 60 !== 0 && Math.floor(sec / 60) >= 1 && (
        <Text className={style.number}>
          {`${sec % 60}${t("eta.secondShort")}`}
        </Text>
      )}
    </div>
  );
}

function ArrivingBadge({ vehicle }: { vehicle?: number }) {
  const { t } = useTranslation();

  return (
    <div className={style.arriving}>
      {vehicle ? (
        <Link to={`${vehicle}`}>
          <Badge className={style["badge-in-link"]} shape="rounded">
            Track location
          </Badge>
        </Link>
      ) : (
        <Badge
          className={style["badge-in-link"]}
          color="danger"
          shape="rounded"
        >
          {t("badge.arriving")}
        </Badge>
      )}
    </div>
  );
}
