import { Button, LargeTitle, Text, Title1 } from "@fluentui/react-components";
import { ArrowClockwise24Regular } from "@fluentui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { store } from "../../store/index.js";
import { subwayDbSelectors } from "../../store/suwbayDb/slice.js";
import { BookmarkButton } from "../bookmarks/BookmarkButton.js";
import { CountdownSec } from "../countdown/CountdownSec.js";
import RawDisplay from "../rawDisplay/RawDisplay.js";
import { ttcSubwayPredictions } from "./queries.js";

function SubwayStopPredictionInfo(props: {
  line: number;
  stopNum: number;
}): JSX.Element {
  const [lastUpdatedAt, setLastUpdatedAt] = useState<number>(Date.now());

  const { t } = useTranslation();

  const ttcSubwayPredictionsResponse = useQuery({
    ...ttcSubwayPredictions(props.stopNum),
    queryKey: [`ttc-subway-stop-${props.stopNum}`, lastUpdatedAt.toString()],
  });

  const data = useMemo(() => {
    return ttcSubwayPredictionsResponse.data?.[0];
  }, [ttcSubwayPredictionsResponse.data]);

  const fetchPredictions = useCallback(() => {
    setLastUpdatedAt(Date.now());
  }, [lastUpdatedAt]);

  const fetchPredictionClick = useCallback(() => {
    fetchPredictions();
  }, []);

  const stationInfo = subwayDbSelectors.selectById(
    store.getState().subwayDb,
    props.stopNum
  );

  const trainETAs = useMemo(
    (nextTrainsData = data?.nextTrains) => {
      if (!nextTrainsData || nextTrainsData?.length <= 0) {
        return <Text> {t("reminder.noEta")}</Text>;
      }

      const nextTrains = nextTrainsData.split(",");

      return nextTrains.map((minute: string, index: number) => {
        return (
          <div key={`${index}-${minute}`}>
            <CountdownSec second={Number.parseInt(minute) * 60} />
          </div>
        );
      });
    },
    [data?.nextTrains]
  );

  if (!data) {
    return (
      <div className="directionsList list">
        <LargeTitle>{t("reminder.loading")}</LargeTitle>
        <RefreshButton onRefresh={fetchPredictionClick} />
      </div>
    );
  }

  if (data.Error) {
    return <LargeTitle>{t("reminder.failToLocate")}</LargeTitle>;
  }

  return (
    <div className="directionsList list">
      {stationInfo && (
        <>
          <Title1>{stationInfo.stop.name.split(" - ")[0]}</Title1>
          <br />
        </>
      )}
      <Title1>{data.directionText}</Title1>
      <div className="countdown-row">
        <RefreshButton onRefresh={fetchPredictionClick} />
        <BookmarkButton
          stopId={props.stopNum}
          name={data.directionText}
          ttcId={props.stopNum}
          lines={[props.line.toString()]}
          type="ttc-subway"
        />
      </div>
      {trainETAs}
      <RawDisplay data={data} />
    </div>
  );
}

function RefreshButton(props: { onRefresh: () => void }) {
  const { t } = useTranslation();

  return (
    <Button onClick={props.onRefresh} icon={<ArrowClockwise24Regular />}>
      {t("buttons.refresh")}
    </Button>
  );
}
export default SubwayStopPredictionInfo;
