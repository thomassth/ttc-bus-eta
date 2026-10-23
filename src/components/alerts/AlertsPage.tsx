import { TZDate } from "@date-fns/tz";
import { Button } from "@fluentui/react-components";
import { lazy, Suspense, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import style from "./AlertsPage.module.css";

const AllBskyAlerts = lazy(() => import("./bsky-alerts/AllBskyAlerts.js"));

import { parse, sub } from "date-fns";
// import CurrentAlerts from "./CurrentAlerts.js";
import { SubwayClosures } from "./subway-closures/SubwayClosures.js";

export default function TtcAlertList() {
  const currentTime = new TZDate(new Date(), "America/Toronto");
  const currentDate = useMemo(() => {
    return currentTime.toISOString().split("T")[0];
  }, [currentTime]);
  const [enabledStartDate, setEnabledStartDate] = useState<string>(currentDate);
  const { t } = useTranslation();

  const prevDate = useMemo(() => {
    const handlingDate = parse(enabledStartDate, "yyyy-MM-dd", new Date());

    return sub(handlingDate, { days: 1 }).toISOString().split("T")[0];
  }, [enabledStartDate]);

  const nextDate = useMemo(() => {
    const handlingDate = parse(enabledStartDate, "yyyy-MM-dd", new Date());

    return sub(handlingDate, { days: -1 }).toISOString().split("T")[0];
  }, [enabledStartDate]);

  // get saturday's date
  const weekendDate = useMemo(() => {
    const handlingDate = parse(currentDate, "yyyy-MM-dd", new Date());
    if (handlingDate.getDay() === 6) {
      // show Sunday data on Saturdays, otherwise show the next Sunday
      handlingDate.setDate(handlingDate.getDate() + 1);
    } else {
      handlingDate.setDate(
        handlingDate.getDate() + ((6 - handlingDate.getDay()) % 7)
      );
    }
    return handlingDate.toISOString().split("T")[0];
  }, [currentDate]);

  return (
    <div className="alert-page">
      <div className={style["button-bar"]}>
        <Button
          className={style["small-button"]}
          onClick={() => setEnabledStartDate(prevDate)}
          aria-label={`Previous day, ${prevDate}`}
        >
          ◀
        </Button>
        <Button onClick={() => setEnabledStartDate(currentDate)}>
          {t("alerts.now")}
        </Button>
        <Button
          onClick={() => setEnabledStartDate(weekendDate)}
          aria-label={`This weekend, ${weekendDate}`}
        >
          {t("alerts.thisWeekend")}
        </Button>
        <Button
          className={style["small-button"]}
          onClick={() => setEnabledStartDate(nextDate)}
          aria-label={`Next day, ${nextDate}`}
        >
          ▶
        </Button>
      </div>
      <div>
        <SubwayClosures startDate={enabledStartDate} />
        {/*<CurrentAlerts />*/}
        <Suspense fallback={<div>Loading alerts...</div>}>
          <AllBskyAlerts />
        </Suspense>
      </div>
    </div>
  );
}
