import { useParams } from "react-router-dom";
import { Text } from "@fluentui/react"
import { boldStyle } from "../styles/fluent";
import LineStopPredictionInfo from "../components/FetchLineStop";

export default function LineStopPrediction() {
    let params = useParams();
    const lineNum = parseInt(`${params.lineId}`)
    return (
        <main style={{ padding: "1rem" }}>
            <Text variant="large" styles={boldStyle}>
                Line {lineNum} Stop {params.stopNum} =
            </Text>
            <LineStopPredictionInfo line={lineNum} stopNum={params.stopNum}/>
        </main>
    );
}