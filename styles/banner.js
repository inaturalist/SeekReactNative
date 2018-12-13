import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins
} from "./global";

export default StyleSheet.create( {
  container: {
    zIndex: 1
  },
  animatedStyle: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    justifyContent: "center",
    backgroundColor: colors.white,
    height: 80
  },
  banner: {
    zIndex: 1
  },
  animatedRow: {
    alignItems: "flex-end"
  },
  row: {
    backgroundColor: colors.white,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 42
  },
  mainBannerImage: {
    zIndex: 2,
    marginTop: margins.medium,
    marginLeft: margins.medium,
    tintColor: colors.darkGreen,
    height: 31,
    width: 38
  },
  speciesBannerImage: {
    zIndex: 1,
    marginLeft: margins.medium,
    marginBottom: margins.medium
  },
  mainText: {
    marginLeft: margins.small,
    fontWeight: "100"
  },
  text: {
    marginLeft: margins.medium,
    fontFamily: fonts.default,
    fontSize: fontSize.text,
    fontWeight: "500",
    color: colors.black
  }
} );
