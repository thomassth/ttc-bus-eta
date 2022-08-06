import { useParams } from "react-router-dom";
import StopPredictionInfo from "../components/FetchStop";
import { Title2 } from "@fluentui/react-components";

export default function StopPrediction() {
    let params = useParams();
    const lineNum = parseInt(`${params.lineId}`)
    return (
        <main style={{ padding: "1rem" }}>
            <Title2>
                Stop ID {params.stopId} =
            </Title2>
            <StopPredictionInfo line={lineNum} stopId={params.stopId} />
        </main>
    );
}