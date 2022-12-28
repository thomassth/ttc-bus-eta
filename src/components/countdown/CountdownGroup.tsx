import { Badge, Title2 } from "@fluentui/react-components";
import { CountdownSec } from "./CountdownSec";

export default function CountdownGroup(props: any) {
  return (
    <div
      className="line"
      style={{ display: "flex", flexDirection: "column", padding: "1rem 0" }}
    >
      <Title2 as="h2">{props.obj.line}</Title2>
      {props.obj.etas.map(
        (el2: { branch: string; second: number }, in2: number) => (
          <div key={in2}>
            <CountdownBranch branch={el2.branch} />
            <CountdownSec second={el2.second} />
          </div>
        )
      )}
    </div>
  );
}

function CountdownBranch(props: any) {
  return <Badge>{props.branch}</Badge>;
}

export const expiredStyle = {
  color: "red",
};
