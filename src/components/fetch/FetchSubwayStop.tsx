import { Button, LargeTitle, Text, Title1 } from "@fluentui/react-components";
import { ArrowClockwise24Regular } from "@fluentui/react-icons";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { SubwayStop } from "../../models/ttc.js";
import { store } from "../../store/index.js";
import { subwayDbSelectors } from "../../store/suwbayDb/slice.js";
import { BookmarkButton } from "../bookmarks/BookmarkButton.js";
import { CountdownSec } from "../countdown/CountdownSec.js";
import RawDisplay from "../rawDisplay/RawDisplay.js";
import { getTTCSubwayPredictions } from "./fetchUtils.js";

function SubwayStopPredictionInfo(props: {
  line: number;
  stopNum: number;
}): JSX.Element {
  const [data, setData] = useState<SubwayStop>();
  const { t } = useTranslation();

  const fetchPredictions = (stopNum = props.stopNum) => {
    getTTCSubwayPredictions(stopNum, {}).then((dataJson) => {
      setData(dataJson[0]);
    });
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictionClick = useCallback(() => {
    fetchPredictions();
  }, []);

  const stationName = subwayDbSelectors.selectById(
    store.getState().subwayDb,
    props.stopNum
  );

  const trainETAs = (nextTrainsData: string) => {
    if (nextTrainsData.length <= 0) {
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
  };

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
      {stationName && (
        <>
          <Title1>{stationName.stop.name.split(" - ")[0]}</Title1>
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
      {trainETAs(data.nextTrains)}
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
