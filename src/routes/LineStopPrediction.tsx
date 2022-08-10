import { useParams } from "react-router-dom";
import LineStopPredictionInfo from "../components/FetchLineStop";
import { Title2 } from "@fluentui/react-components";

export default function LineStopPrediction() {
  const params = useParams();
  const lineNum = parseInt(`${params.lineId}`);
  return (
    <main style={{ padding: "1rem" }}>
      <Title2>
        Line {lineNum} Stop {params.stopNum} =
      </Title2>
      <LineStopPredictionInfo line={lineNum} stopNum={params.stopNum} />
    </main>
  );
}
