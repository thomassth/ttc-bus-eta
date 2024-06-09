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

  function RefreshButton() {
    return (
      <Button onClick={fetchPredictionClick} icon={<ArrowClockwise24Regular />}>
        {t("buttons.refresh")}
      </Button>
    );
  }

  const stationName = subwayDbSelectors.selectById(
    store.getState().subwayDb,
    props.stopNum
  );

  if (data) {
    if (data.Error) {
      return <LargeTitle>{t("reminder.failToLocate")}</LargeTitle>;
    } else {
      if (data.nextTrains.length > 0) {
        const nextTrains = data.nextTrains.split(",");

        const listGroup = nextTrains.map((minute, index) => {
          return (
            <div key={`${index}-${minute}`}>
              <CountdownSec second={Number.parseInt(minute) * 60} />
            </div>
          );
        });
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
              <RefreshButton />
              <BookmarkButton
                stopId={props.stopNum}
                name={data.directionText}
                ttcId={props.stopNum}
                lines={[props.line.toString()]}
                type="ttc-subway"
              />
            </div>
            {listGroup}
            <RawDisplay data={data} />
          </div>
        );
      } else {
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
              <RefreshButton />
              <BookmarkButton
                stopId={props.stopNum}
                name={data.directionText}
                ttcId={props.stopNum}
                lines={[props.line.toString()]}
                type="ttc-subway"
              />
            </div>
            <Text> {t("reminder.noEta")}</Text>
            <RawDisplay data={data} />
          </div>
        );
      }
    }
  } else {
    return (
      <div className="directionsList list">
        <LargeTitle>{t("reminder.loading")}</LargeTitle>
        <RefreshButton />
      </div>
    );
  }
}
export default SubwayStopPredictionInfo;
