// Not maintained for now: no appearant use when comparing to FetchStop
import { Button, LargeTitle, Text } from "@fluentui/react-components";
import { ArrowClockwise24Regular } from "@fluentui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { CountdownSec } from "../countdown/CountdownSec.js";
import RawDisplay from "../rawDisplay/RawDisplay.js";
import { ttcLineStopPrediction } from "./queries.js";

function RefreshButton({ onClick }: { onClick: () => void }) {
  const { t } = useTranslation();
  return (
    <Button onClick={onClick} icon={<ArrowClockwise24Regular />}>
      {t("buttons.refresh")}
    </Button>
  );
}
function LineStopPredictionInfo(props: {
  line: number;
  stopNum: number;
}): JSX.Element {
  const [lastUpdatedAt, setLastUpdatedAt] = useState<number>(Date.now());
  const { t } = useTranslation();

  const ttcLineStopPredictionsResponse = useQuery({
    ...ttcLineStopPrediction(props.line, props.stopNum),
    queryKey: [
      `ttc-line-stop-${props.line}-${props.stopNum}`,
      lastUpdatedAt.toString(),
    ],
  });

  const data = useMemo(() => {
    return ttcLineStopPredictionsResponse.data;
  }, [ttcLineStopPredictionsResponse.data]);

  const fetchPredictionClick = useCallback(() => {
    setLastUpdatedAt(Date.now());
  }, []);

  if (data) {
    if (data.Error) {
      return <LargeTitle>{t("reminder.failToLocate")}</LargeTitle>;
    }
    if (Array.isArray(data.predictions)) {
      // TODO
      return <div />;
    }
    if (data.predictions?.dirTitleBecauseNoPredictions) {
      return (
        <div className="directionsList list">
          <LargeTitle>{data.predictions.stopTitle}</LargeTitle>
          <div className="countdown-row">
            <RefreshButton onClick={fetchPredictionClick} />
          </div>
          <Text> {t("reminder.noEta")}</Text>
          <RawDisplay data={data} />
        </div>
      );
    }
    if (Array.isArray(data.predictions?.direction)) {
      const directionListGroup = data.predictions.direction.map((line) => {
        return (
          <div className="directionList list" key={line.title}>
            <Text>{line.title}</Text>
            {Array.isArray(line.prediction) ? (
              line.prediction.map((bus) => {
                return (
                  <CountdownSec
                    second={bus.seconds}
                    epochTime={bus.epochTime}
                    key={bus.tripTag}
                  />
                );
              })
            ) : (
              <CountdownSec
                second={line.prediction.seconds}
                epochTime={line.prediction.epochTime}
                key={line.prediction.tripTag}
              />
            )}
          </div>
        );
      });

      return (
        <div>
          <div className="countdown-row">
            <RefreshButton onClick={fetchPredictionClick} />
          </div>
          {directionListGroup}
        </div>
      );
    }
    if (Array.isArray(data.predictions?.direction.prediction)) {
      const directionListGroup = data.predictions.direction.prediction.map(
        (bus) => {
          return (
            <CountdownSec
              second={bus.seconds}
              epochTime={bus.epochTime}
              key={bus.tripTag}
            />
          );
        }
      );
      // Only 1 direction
      return (
        <div className="directionsList list">
          <LargeTitle>{data.predictions.stopTitle}</LargeTitle>
          <div className="countdown-row">
            <RefreshButton onClick={fetchPredictionClick} />
          </div>
          <div className="directionList list">{directionListGroup}</div>
          <RawDisplay data={data} />
        </div>
      );
    }
    // Only 1 time or only 1 direction

    return (
      <div className="directionsList list">
        <LargeTitle>{data.predictions?.stopTitle}</LargeTitle>
        <RefreshButton onClick={fetchPredictionClick} />
        <RawDisplay data={data} />
      </div>
    );
  }
  return (
    <div className="directionsList list">
      <LargeTitle>{t("reminder.loading")}</LargeTitle>
      <RefreshButton onClick={fetchPredictionClick} />
    </div>
  );
}
export default LineStopPredictionInfo;
