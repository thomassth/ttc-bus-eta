import { Badge } from "@fluentui/react-components";

import { fluentStyles } from "../styles/fluent";

const badgeColor = (text: string) => {
  switch (true) {
    case /9[\d]{2}.*/.test(text):
      return "success";
    case /3[\d]{2}.*/.test(text):
      return "brand";
    case /[2,4][\d]{2}.*/.test(text):
      return "important";
    default:
      return "danger";
  }
};

const customBgColor = (text: string) => {
  if (/2[\d]{2}.*/.test(text)) {
    return "pink";
  }
};

const badgeOutline = (text: string) => {
  const occasional = new Set([10, 99, 101, 115, 119, 160, 162, 167, 169, 176]);
  switch (true) {
    case /[9][\d]{2}.*/.test(text):
      return "filled";
    case /[3,4][\d]{2}.*/.test(text):
      return "outline";
    default:
      for (const item of occasional) {
        if (text.startsWith(`${item}`)) {
          return "outline";
        }
      }
      return "filled";
  }
};

export function TtcBadge(props: { lineNum: string }) {
  const fluentStyle = fluentStyles();

  return (
    <Badge
      style={{ backgroundColor: customBgColor(props.lineNum) }}
      className={fluentStyle.badge}
      color={badgeColor(`${props.lineNum}`)}
      appearance={badgeOutline(props.lineNum)}
      shape="rounded"
    >
      {props.lineNum}
    </Badge>
  );
}

export function YRTBadge(props: { lineAbbr: string }) {
  const vivaBgColor = new Map([
    ["601", "#009cdb"],
    ["603", "#9461a8"],
    ["605", "#fbaf33"],
  ]);
  const vivaColor = new Map([["605", "black"]]);

  const bgColor = vivaBgColor.get(props.lineAbbr);
  const textColor = vivaColor.get(props.lineAbbr);

  return (
    <Badge
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {props.lineAbbr}
    </Badge>
  );
}
