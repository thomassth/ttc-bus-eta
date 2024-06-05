import { Link as LinkFluent, Text, Title2 } from "@fluentui/react-components";
import { Link } from "react-router-dom";

import { LineStopEta } from "../../models/etaObjects.js";
import style from "./CountdownGroup.module.css";
import { CountdownRow } from "./CountdownRow.js";

export default function CountdownGroup(props: { detail: LineStopEta }) {
  const countdownRowList = props.detail.etas.map((item, index) => (
    <CountdownRow item={item} key={item.tripTag} index={index} />
  ));

  if (props.detail.etas.length === 0) {
    return null;
  } else
    return (
      <li className={style["stop-prediction-details"]}>
        <Link to={`/lines/${props.detail.line}`} className="router-link">
          <LinkFluent>
            <Title2>{props.detail.line}</Title2>
          </LinkFluent>
        </Link>
        <Text>{props.detail.routeName}</Text>
        {countdownRowList}
      </li>
    );
}
