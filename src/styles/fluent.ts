import { makeStyles, shorthands } from "@fluentui/react-components";

export const fluentStyles = makeStyles({
  accordionHeader: {
    ...shorthands.margin("0px", "0px"),

    "& button": {
      height: "auto",
      paddingLeft: "0px",
    },
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
