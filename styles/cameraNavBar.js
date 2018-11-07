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
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: margins.medium,
    paddingBottom: padding.medium,
    backgroundColor: colors.black,
    height: 55
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  buttons: {
    flex: 0.3,
    height: 30,
    marginHorizontal: margins.extraSmall,
    marginBottom: margins.small,
    marginTop: margins.medium + 5,
    padding: padding.medium
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
  }
} );
