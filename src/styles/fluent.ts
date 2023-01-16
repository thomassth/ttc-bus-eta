import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const fluentStyles = makeStyles({
  fluentProvider: {
    height: "100%",
  },
  badge: {
    ...shorthands.margin("0.5rem", "0.25rem"),
    minWidth: "2.5rem",
  },
  accordionHeader: {
    ...shorthands.margin("0.25rem", "0"),

    "& button": {
      height: "auto",
      paddingLeft: "0",
    },
  },
  number: {
    fontFamily: ["monospace", "PT Mono"],
  },
  refreshButton: {
    width: "max-content",
    marginRight: "10px",
  },
  bottomNav: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  bottomNavButton: {
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: "auto",
    "& span": {
      marginRight: "0",
    },
  },
  navButtonLink: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
  },
  sideNavButton: {
    ...shorthands.padding("0.5rem", " 0"),
    width: "100%",
    borderTopLeftRadius: "0px",
    borderBottomLeftRadius: "0px",
    ":focus": {
      borderTopLeftRadius: "0px",
      borderBottomLeftRadius: "0px",
      ...shorthands.borderColor("transparent !important"),
      boxShadow: "0 0 0 0 transparent !important",
    },
  },
  flexGrowContent: {
    flexGrow: 1,
  },
  accordionPanel: {
    display: "grid",
    gridTemplateColumns: "36px 36px auto",
    gridAutoRows: "auto",
    alignItems: "start",
    ...shorthands.gap("0.2rem"),
    paddingBottom: "4px",
  },
  smallRoundNavButton: {
    width: "3rem",
    height: "3rem",
    minWidth: "0 !important",
    maxWidth: "unset",
    marginLeft: "auto",
    marginRight: "auto",
    "& span": {
      marginRight: "0",
    },
  },
});
