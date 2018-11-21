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
    backgroundColor: colors.black,
    opacity: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 30
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
  footer: {
    flex: 0.2,
    marginTop: margins.medium,
    paddingBottom: padding.extraSmall,
    backgroundColor: colors.black
  }
} );
