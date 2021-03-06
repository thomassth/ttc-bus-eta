import { Outlet, useParams } from "react-router-dom";
import { Text } from "@fluentui/react"
import RouteInfo from "../components/FetchRoute";
import { boldStyle } from "../styles/fluent";

export default function Line() {
    let params = useParams();
    const lineNum = parseInt(`${params.lineId}`)
    return (
        <main style={{ padding: "1rem" }}>
            <Text variant="large" styles={boldStyle}>
                Line {lineNum} =
            </Text>
            <RouteInfo line={lineNum} />
            <Outlet/>
        </main>
    );
}