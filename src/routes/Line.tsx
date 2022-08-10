import { Accordion, Title2 } from "@fluentui/react-components";
import { Outlet, useParams } from "react-router-dom";
import RouteInfo from "../components/FetchRoute";

export default function Line() {
  const params = useParams();
  const lineNum = parseInt(`${params.lineId}`);
  return (
    <main style={{ padding: "1rem" }}>
      <Title2>Line {lineNum} =</Title2>
      <Accordion>
        <RouteInfo line={lineNum} />
      </Accordion>
      <Outlet />
    </main>
  );
}
