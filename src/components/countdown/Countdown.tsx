import { Badge, Title2 } from "@fluentui/react-components";
import { t } from "i18next";
import { useCallback, useEffect, useState } from "react";

import { fluentStyles } from "../../styles/fluent";

export function Countdown(props: { minute: number }) {
  const [minute, setMinute] = useState(props.minute);
  const fluentStyle = fluentStyles();

  const ArrivingBadge = useCallback(() => {
    return minute <= 3 ? (
      <div className="badge arriving">
        <Badge color="danger" shape="rounded">
          {t("badge.arriving")}
        </Badge>
      </div>
    ) : null;
  }, [minute]);

  const EtaTime = useCallback(() => {
    return minute >= 0 ? (
      <Title2 className={fluentStyle.countDown}>{`${minute}${t(
        "eta.minuteShort"
      )}`}</Title2>
    ) : null;
  }, [minute]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinute(minute - 1);
    }, 60000);

    if (minute <= 0) {
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [minute]);

  return (
    <div className="countdown">
      <ArrivingBadge />
      <EtaTime />
    </div>
  );
}
