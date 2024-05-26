import { Link } from "react-router-dom";

import { EtaBusWithID } from "../../models/etaObjects.js";
import { TtcBadge } from "../badges.js";
import style from "./CountdownRow.module.css";
import { CountdownSec } from "./CountdownSec.js";

function CountdownBranch(props: { branch: string }) {
  return <TtcBadge key={props.branch} lineNum={props.branch} />;
}

export function CountdownRow(props: { item: EtaBusWithID; index: number }) {
  return (
    <div className={style["countdown-row"]}>
      <Link to={`/lines/${props.item.branch}`}>
        <CountdownBranch branch={props.item.branch} />
      </Link>
      <CountdownSec
        second={props.item.seconds}
        epochTime={props.item.epochTime}
        vehicle={props.item.vehicle}
        index={props.index}
      />
    </div>
  );
}
