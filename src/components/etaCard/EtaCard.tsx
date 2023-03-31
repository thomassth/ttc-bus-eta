import {
  Badge,
  Button,
  Card,
  CardHeader,
  Text,
} from "@fluentui/react-components";
import { Dismiss12Filled } from "@fluentui/react-icons";
import { t } from "i18next";
import { Link } from "react-router-dom";

import { EtaBusWithID } from "../../models/etaObjects";
import { fluentStyles } from "../../styles/fluent";
import { CountdownSec } from "../countdown/CountdownSec";

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
    <li className={props.editable ? "cardWithButton" : ""}>
      {props.editable && (
        <Button
          className={fluentStyle.removeButton}
          title={t("buttons.delete") ?? "delete"}
          icon={<Dismiss12Filled />}
          onClick={props.onDelete}
        />
      )}
      <Link className={`bookmarkedStop`} to={props.stopUrl}>
        <Card className="clickableCard">
          <CardHeader
            header={
              <>
                <div className="badgeGroup">
                  {props.lines.map((line: string) => {
                    return (
                      <Badge className={fluentStyle.badge} key={line}>
                        {line}
                      </Badge>
                    );
                  })}
                </div>
                <Text>{props.name}</Text>
              </>
            }
            action={
              <div className="etaCardCountdown">
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
