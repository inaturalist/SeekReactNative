import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins,
  padding
} from "./global";

export default StyleSheet.create( {
  coloredHeader: {
    backgroundColor: colors.lightGray,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  buttons: {
    flex: 0.3,
    marginTop: margins.medium + 5,
    padding: padding.small
  },
  text: {
    fontSize: fontSize.smallText,
    color: colors.white,
    fontFamily: fonts.default,
    marginLeft: margins.medium
  },
  grayText: {
    fontSize: fontSize.smallText,
    color: colors.darkGray,
    fontFamily: fonts.default,
    marginLeft: margins.medium
  },
  underline: {
    textDecorationLine: "underline"
  },
  footer: {
    flex: 0.2,
    marginTop: margins.medium,
    paddingBottom: padding.extraSmall,
    backgroundColor: colors.black
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
} );
