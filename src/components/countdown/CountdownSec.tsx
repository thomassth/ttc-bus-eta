import { Badge, Title2 } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { fluentStyles } from "../../styles/fluent";

export const expiredStyle = {
  color: "red",
};

export function CountdownSec(props: { second: number; epochTime?: number }) {
  const [sec, setSec] = useState(props.second);
  const fluentStyle = fluentStyles();
  const { t } = useTranslation();

  // TODO: not using seconds provided in API; may make it an option later

  useEffect(() => {
    const timer = setTimeout(() => {
      setSec(sec - 1);
    }, 1000);
    if (sec <= 0) {
      clearTimeout(timer);
    }

    // Cleanup
    return () => clearTimeout(timer);
  }, [sec]);
  return (
    <div className="countdownSec number">
      {sec < 180 ? <ArrivingBadge /> : null}

      {sec > 0 ? (
        <Title2 className={fluentStyle.number}>
          {Math.floor(sec / 60) >= 1
            ? `${Math.floor(sec / 60)}${t("eta.minuteShort")} `
            : `${sec % 60}${t("eta.secondShort")}`}
        </Title2>
      ) : null}
    </div>
  );
}

function ArrivingBadge() {
  const { t } = useTranslation();

  return (
    <div className="badge arriving">
      <Badge color="danger" shape="rounded">
        {t("badge.arriving")}
      </Badge>
    </div>
  );
}
