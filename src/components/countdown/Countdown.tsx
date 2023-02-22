import { Badge, Title2 } from "@fluentui/react-components";
import { t } from "i18next";
import { useCallback, useEffect, useState } from "react";

import { fluentStyles } from "../../styles/fluent";

export function Countdown(props: { second: number }) {
  const [sec, setSec] = useState(props.second);
  const fluentStyle = fluentStyles();

  const ArrivingBadge = useCallback(() => {
    return sec < 180 ? (
      <div className="badge arriving">
        <Badge color="danger" shape="rounded">
          {t("badge.arriving")}
        </Badge>
      </div>
    ) : null;
  }, [sec]);

  const EtaTime = useCallback(() => {
    const etaTime =
      Math.floor(sec / 60) >= 1
        ? `${Math.floor(sec / 60)}${t("eta.minuteShort")} `
        : `${sec % 60}${t("eta.secondShort")}`;

    return sec > 0 ? (
      <Title2 className={fluentStyle.number}>{etaTime}</Title2>
    ) : null;
  }, [sec]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSec(sec - 1);
    }, 1000);

    if (sec <= 0) {
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [sec]);

  return (
    <div className="countdown">
      <ArrivingBadge />
      <EtaTime />
    </div>
  );
}
