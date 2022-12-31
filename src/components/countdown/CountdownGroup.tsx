import { Badge, Title2, Link, Text } from "@fluentui/react-components";
import { CountdownSec } from "./CountdownSec";
import { fluentStyles } from "../../styles/fluent";

export default function CountdownGroup(props: any) {
  return (
    <div className="line">
      <Title2>
        <Link href={`../lines/${props.obj.line}`}>{props.obj.line}</Link>
      </Title2>
      <Text>{props.obj.routeName}</Text>
      {props.obj.etas.map(
        (el2: { branch: string; second: number }, in2: number) => (
          <div className="countdown-row" key={in2}>
            <CountdownBranch branch={el2.branch} />
            <CountdownSec second={el2.second} />
          </div>
        )
      )}
    </div>
  );
}

function CountdownBranch(props: any) {
  const overrides = fluentStyles();

  return (
    <Badge className={overrides.badge} appearance="outline">
      {props.branch}
    </Badge>
  );
}
