import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const fluentStyles = makeStyles({
  fluentProvider: {
    height: "100%",
  },
  removeButton: {
    minHeight: "32px",
    minWidth: "32px",

    position: "absolute",
    top: "-16px",
    right: "-16px",

    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  },
  badge: {
    ...shorthands.margin("0.5rem", "0.25rem"),
    minWidth: "45px",
    marginLeft: "0px",
    marginRight: "8px",
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
    paddingBottom: "8px",
  },
  smallRoundNavButton: {
    width: "3rem",
    height: "3rem",
    minWidth: "0px",
    maxWidth: "unset",
    marginLeft: "auto",
    marginRight: "auto",
    "& span": {
      marginRight: "0",
    },
  },
});
