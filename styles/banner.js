import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  padding,
  margins
} from "./global";

const { width } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  banner: {
    zIndex: 1,
    flex: 1
  },
  background: {
    backgroundColor: colors.white,
    height: 42,
    width
  },
  mainBackground: {
    top: 35,
    zIndex: 1
  },
  speciesBannerImage: {
    position: "absolute",
    bottom: 10,
    left: 10,
    zIndex: 1
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    backgroundColor: colors.white
  },
  mainBannerImage: {
    paddingLeft: padding.medium,
    // position: "absolute",
    // top: 25,
    // left: 10,
    zIndex: 2
  },
  text: {
    fontFamily: fonts.default,
    fontSize: fontSize.text,
    fontWeight: "500",
    color: colors.black,
    marginTop: margins.small,
    marginBottom: margins.small,
    textAlign: "center"
  }
} );
