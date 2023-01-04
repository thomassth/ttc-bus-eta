import { Title2 } from "@fluentui/react-components";
import { useParams } from "react-router-dom";

import LineStopPredictionInfo from "../components/FetchLineStop";

export default function LineStopPrediction() {
  const params = useParams();
  const lineNum = parseInt(`${params.lineId}`);
  const stopNum = parseInt(`${params.stopNum}`);
  return (
    <main>
      <Title2>
        Line {lineNum} Stop {params.stopNum} =
      </Title2>
      <LineStopPredictionInfo line={lineNum} stopNum={stopNum} />
    </main>
  );
}
