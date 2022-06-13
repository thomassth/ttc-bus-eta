import { useParams } from "react-router-dom";
import { Text } from "@fluentui/react"
import { boldStyle } from "../styles/fluent";
import StopPredictionInfo from "../components/FetchStop";

export default function StopPrediction() {
    let params = useParams();
    const lineNum = parseInt(`${params.lineId}`)
    return (
        <main style={{ padding: "1rem" }}>
            <Text variant="large" styles={boldStyle}>
                Stop ID {params.stopId} =
            </Text>
            <StopPredictionInfo line={lineNum} stopId={params.stopId} />
        </main>
    );
}