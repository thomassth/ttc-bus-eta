import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const fluentStyles = makeStyles({
  badge: {
    ...shorthands.margin("0.5rem", "0.25rem"),
    minWidth: "2.5rem",
  },
  accordionHeader: {
    ...shorthands.margin("0.25rem", "0"),

    "& button": {
      height: "auto",
    },
  },
  number: {
    fontFamily: ["monospace", "PT Mono"],
  },
  refreshButton: {
    width: "max-content",
  },
  bottomNav: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  bottomNavButton: {
    flexDirection: "column",
  },
});
