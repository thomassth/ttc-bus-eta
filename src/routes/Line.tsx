import { Accordion, Title2 } from "@fluentui/react-components";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import RouteInfo from "../components/FetchRoute";

export default function Line() {
  const params = useParams();
  const lineNum = parseInt(`${params.lineId}`);
  useEffect(() => {
    document.title = `Line ${lineNum} | TTC arrivals`;
  });
  return (
    <main>
      <Title2>Line {lineNum} =</Title2>
      <Accordion defaultOpenItems collapsible>
        <RouteInfo line={lineNum} />
      </Accordion>
      <Outlet />
    </main>
  );
}
