import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins
} from "./global";

export default StyleSheet.create( {
  banner: {
    zIndex: 1,
    backgroundColor: colors.white
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 42
  },
  speciesBannerImage: {
    zIndex: 1,
    marginLeft: margins.medium,
    marginBottom: margins.medium
  },
  mainBannerImage: {
    zIndex: 2,
    marginLeft: margins.medium,
    marginBottom: margins.medium
  },
  text: {
    marginLeft: margins.medium,
    fontFamily: fonts.default,
    fontSize: fontSize.text,
    fontWeight: "500",
    color: colors.black
  }
} );
