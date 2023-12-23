import { Link } from "react-router-dom";

import { EtaBusWithID } from "../../models/etaObjects";
import { TtcBadge } from "../badges";
import style from "./CountdownRow.module.css";
import { CountdownSec } from "./CountdownSec";

function CountdownBranch(props: { branch: string }) {
  return <TtcBadge key={props.branch} lineNum={props.branch} />;
}

export function CountdownRow(props: { item: EtaBusWithID }) {
  return (
    <div className={style["countdown-row"]}>
      <Link to={`/lines/${props.item.branch}`}>
        <CountdownBranch branch={props.item.branch} />
      </Link>
      <CountdownSec
        second={props.item.seconds}
        epochTime={props.item.epochTime}
        vehicle={props.item.vehicle}
      />
    </div>
  );
}
