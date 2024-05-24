import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const fluentStyles = makeStyles({
  fluentProvider: {
    height: "100%",
  },
  centerInput: {
    "& input": {
      textAlign: "center",
      width: "100%",
      height: "5rem",
    },
  },
  badge: {
    ...shorthands.margin("0px", "8px", "0px", "0px"),
    minWidth: "48px",
  },
  accordionHeader: {
    ...shorthands.margin("0px", "0px"),

    "& button": {
      height: "auto",
      paddingLeft: "0px",
    },
  },
  number: {
    fontFamily: ["monospace", "PT Mono"],
    whiteSpace: "nowrap",
  },
  refreshButton: {
    width: "max-content",
  },
  bottomNav: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  bottomNavButton: {
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: "auto",
    "& span": {
      marginRight: "0px",
    },
  },
  navButtonLink: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
  },
  sideNavButton: {
    ...shorthands.padding("8px", "0px"),
    width: "100%",
    borderTopLeftRadius: "0px",
    borderBottomLeftRadius: "0px",
    ":focus": {
      borderTopLeftRadius: "0px",
      borderBottomLeftRadius: "0px",
      ...shorthands.borderColor("transparent !important"),
      boxShadow: "0px 0px 0px 0px transparent !important",
    },
  },
  flexGrowContent: {
    flexGrow: 1,
  },
  accordionPanel: {
    display: "grid",
    gridTemplateColumns: "36px 36px auto",
    gridAutoRows: "auto",
    paddingTop: "8px",
    paddingBottom: "8px",
  },
  smallRoundNavButton: {
    width: "48px",
    height: "48px",
    minWidth: "0px",
    maxWidth: "unset",
    marginLeft: "auto",
    marginRight: "auto",
    "& span": {
      marginRight: "0px",
    },
  },
});
