import { Link as LinkFluent, Title2 } from "@fluentui/react-components";
import { Link } from "react-router";

import type { LineStopEta } from "../../models/etaObjects.js";
import { DirectionBadge } from "../badges.js";
import style from "./CountdownGroup.module.css";
import { CountdownRow } from "./CountdownRow.js";

export default function CountdownGroup(props: { detail: LineStopEta }) {
  const countdownRowList = props.detail.etas?.map((item, index) => (
    <CountdownRow item={item} key={item.tripTag} index={index} />
  ));

  if (props.detail.etas?.length === 0) {
    return null;
  }
  return (
    <li className={style["stop-prediction-details"]}>
      <Link to={`/lines/${props.detail.line}`} className="router-link">
        <LinkFluent>
          <Title2>{props.detail.line}</Title2>
        </LinkFluent>
      </Link>
      <div className={style["line-name"]}>
        {props.detail.direction && (
          <DirectionBadge direction={props.detail.direction} />
        )}
        <p>{props.detail.routeName}</p>
      </div>
      {countdownRowList}
    </li>
  );
}
