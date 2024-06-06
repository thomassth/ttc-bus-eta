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
} from "@fluentui/react-components";
import { Dismiss12Filled, Edit12Filled } from "@fluentui/react-icons";
import { t } from "i18next";
import { useCallback } from "react";
import { Link } from "react-router-dom";

import { EtaBusWithID } from "../../models/etaObjects.js";
import { editStopBookmark } from "../../store/bookmarks/slice.js";
import { useAppDispatch } from "../../store/index.js";
import { DirectionBadge, TtcBadge } from "../badges.js";
import { CountdownSec } from "../countdown/CountdownSec.js";
import style from "./EtaCard.module.css";

export function EtaCard(props: {
  etas: EtaBusWithID[];
  lines: string[];
  name: string;
  editable: boolean;
  onDelete?: () => void;
  stopUrl: string;
  id: string;
  enabled?: string[];
  direction?: string;
}) {
  return (
    <li
      className={[
        "eta-card",
        props.editable ? style["card-with-button"] : "",
      ].join(" ")}
    >
      <Link to={props.stopUrl} className={style["grid-item"]}>
        <Card className={style["clickable-card"]}>
          <CardHeader
            header={
              <>
                <div
                  className={
                    props.lines.length > 6
                      ? [style["badge-group"], style.overflow].join(" ")
                      : style["badge-group"]
                  }
                >
                  {props.lines.map((line: string) => {
                    return <TtcBadge key={line} lineNum={line} />;
                  })}
                </div>
                <span className={style["multi-line"]}>
                  {props.direction && (
                    <DirectionBadge direction={props.direction} />
                  )}
                  {props.name}
                </span>
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
      {props.editable && (
        <Dialog>
          <DialogTrigger>
            <Button
              className={style["edit-button"]}
              title="edit"
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
            <FavouriteEditor
              id={props.id}
              lines={props.lines}
              enabled={props.enabled}
              onDelete={props.onDelete}
            />
          </DialogSurface>
        </Dialog>
      )}
    </li>
  );
}

function FavouriteEditor(props: {
  id: string;
  lines: string[];
  enabled?: string[];
  onDelete?: () => void;
}) {
  const dispatch = useAppDispatch();

  const onChangeFunction = useCallback(
    (line: string) => {
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
    },
    [props.lines, props.enabled]
  );

  return (
    <DialogContent>
      <div className={style["checkbox-list"]}>
        {props.lines.map((line) => (
          <LineCheckbox
            key={props.id + line}
            id={props.id}
            line={line}
            enabled={props.enabled}
            onChangeFunction={onChangeFunction}
          />
        ))}
      </div>

      <Button
        title={t("buttons.delete") ?? "delete"}
        icon={<Dismiss12Filled />}
        onClick={props.onDelete}
      >
        Delete this stop
      </Button>
    </DialogContent>
  );
}

function LineCheckbox(props: {
  id: string;
  line: string;
  enabled?: string[];
  onChangeFunction: (line: string) => void;
}) {
  const handleClick = useCallback(() => {
    props.onChangeFunction(props.line);
  }, [props.enabled]);
  return (
    <Checkbox
      key={props.id + props.line}
      label={<TtcBadge lineNum={props.line} />}
      checked={!props.enabled || props.enabled?.includes(props.line)}
      onChange={handleClick}
    />
  );
}
