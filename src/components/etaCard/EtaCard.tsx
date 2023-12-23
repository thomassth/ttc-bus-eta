import { Button, Card, CardHeader, Text } from "@fluentui/react-components";
import { Dismiss12Filled } from "@fluentui/react-icons";
import { t } from "i18next";
import { Link } from "react-router-dom";

import { EtaBusWithID } from "../../models/etaObjects";
import { fluentStyles } from "../../styles/fluent";
import { TtcBadge } from "../badges";
import { CountdownSec } from "../countdown/CountdownSec";
import style from "./EtaCard.module.css";

export function EtaCard(props: {
  etas: EtaBusWithID[];
  lines: string[];
  name: string;
  editable: boolean;
  onDelete: undefined | (() => void);
  stopUrl: string;
}) {
  const fluentStyle = fluentStyles();

  return (
    <li
      className={
        "eta-card" + (props.editable ? " " + style["card-with-button"] : "")
      }
    >
      {props.editable && (
        <Button
          className={fluentStyle.removeButton}
          title={t("buttons.delete") ?? "delete"}
          icon={<Dismiss12Filled />}
          onClick={props.onDelete}
        />
      )}
      <Link to={props.stopUrl}>
        <Card className={style["clickable-card"]}>
          <CardHeader
            header={
              <>
                <div className={style["badge-group"]}>
                  {props.lines.map((line: string) => {
                    return <TtcBadge key={line} lineNum={line} />;
                  })}
                </div>
                <Text>{props.name}</Text>
              </>
            }
            action={
              <div className={style["eta-card-countdown"]}>
                {props.etas.length > 0 && (
                  <CountdownSec
                    second={props.etas[0].seconds}
                    epochTime={props.etas[0].epochTime}
                  />
                )}
              </div>
            }
          />
        </Card>
      </Link>
    </li>
  );
}
