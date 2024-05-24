import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Dialog,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Text,
} from "@fluentui/react-components";
import { Dismiss12Filled, Edit12Filled } from "@fluentui/react-icons";
import { t } from "i18next";
import { Link } from "react-router-dom";

import { EtaBusWithID } from "../../models/etaObjects.js";
import { editStopBookmark } from "../../store/bookmarks/slice.js";
import { useAppDispatch } from "../../store/index.js";
import { fluentStyles } from "../../styles/fluent.js";
import { TtcBadge } from "../badges.js";
import { CountdownSec } from "../countdown/CountdownSec.js";
import style from "./EtaCard.module.css";

export function EtaCard(props: {
  etas: EtaBusWithID[];
  lines: string[];
  name: string;
  editable: boolean;
  onDelete: undefined | (() => void);
  stopUrl: string;
  id: string;
  enabled: undefined | string[];
}) {
  const dispatch = useAppDispatch();

  const fluentStyle = fluentStyles();

  return (
    <li
      className={
        "eta-card" + (props.editable ? " " + style["card-with-button"] : "")
      }
    >
      {props.editable && (
        <Dialog>
          <DialogTrigger>
            <Button
              className={fluentStyle.removeButton}
              title={t("buttons.edit") ?? "edit"}
              icon={<Edit12Filled />}
            />
          </DialogTrigger>
          <DialogSurface
            mountNode={document.querySelector(".fui-FluentProvider")}
          >
            <DialogTrigger>
              <Button
                className={style["remove-button"]}
                title="Close"
                icon={<Dismiss12Filled />}
              />
            </DialogTrigger>
            <DialogTitle>Choose which bus(es) to show</DialogTitle>
            <DialogContent>
              {props.lines.map((line) => {
                return (
                  <Checkbox
                    key={props.id + line}
                    label={line}
                    checked={!props.enabled || props.enabled?.includes(line)}
                    onChange={(_e) => {
                      if (!props.enabled) {
                        const cutOffEnabled = [...props.lines];
                        const cutOffIndex = cutOffEnabled.indexOf(line);
                        cutOffEnabled.splice(cutOffIndex, 1);
                        dispatch(
                          editStopBookmark({
                            id: parseInt(props.id),
                            changes: {
                              enabled: cutOffEnabled,
                            },
                          })
                        );
                      } else {
                        const lineArray = [...props.enabled];
                        if (lineArray.includes(line)) {
                          // Remove
                          const lineIndex = lineArray.indexOf(line);
                          lineArray.splice(lineIndex, 1);
                          dispatch(
                            editStopBookmark({
                              id: parseInt(props.id),
                              changes: {
                                enabled: lineArray,
                              },
                            })
                          );
                        } else {
                          // Add
                          lineArray.push(line);
                          dispatch(
                            editStopBookmark({
                              id: parseInt(props.id),
                              changes: {
                                enabled: lineArray,
                              },
                            })
                          );
                        }
                      }
                    }}
                  />
                );
              })}
              <Button
                title={t("buttons.delete") ?? "delete"}
                icon={<Dismiss12Filled />}
                onClick={props.onDelete}
              >
                Delete this stop
              </Button>
            </DialogContent>
          </DialogSurface>
        </Dialog>
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
