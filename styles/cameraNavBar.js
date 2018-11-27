import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins,
  padding
} from "./global";

export default StyleSheet.create( {
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text: {
    fontSize: fontSize.large,
    color: colors.white,
    fontFamily: fonts.default,
    marginTop: margins.large,
    marginHorizontal: margins.large
  },
  cameraFlip: {
    width: 35,
    height: 35,
    tintColor: colors.white,
    marginTop: margins.large,
    marginHorizontal: margins.large
  },
  footer: {
    flex: 0.2,
    marginTop: margins.medium,
    paddingBottom: padding.extraSmall,
    backgroundColor: colors.black
  }
} );
