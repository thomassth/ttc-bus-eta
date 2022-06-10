import { useParams } from "react-router-dom";
import { Text } from "@fluentui/react"
import LineInfo from "../components/FetchBus";
import { boldStyle } from "../styles/fluent";

export default function Line() {
    let params = useParams();
    const lineNum = parseInt(`${params.lineId}`)
    return (
        <main style={{ padding: "1rem" }}>
            <Text variant="large" styles={boldStyle}>
                Line {lineNum} =
            </Text>
            <LineInfo line={lineNum} />
        </main>
    );
}