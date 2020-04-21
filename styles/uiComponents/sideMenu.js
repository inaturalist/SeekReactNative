import {
  StyleSheet,
  Dimensions,
  PixelRatio
} from "react-native";

import {
  colors,
  fonts,
  padding,
  row
} from "../global";

const { height } = Dimensions.get( "window" );
const fontScale = PixelRatio.getFontScale();

export default StyleSheet.create( {
  container: {
    backgroundColor: colors.seekForestGreen,
    flex: 1
  },
  divider: {
    backgroundColor: colors.dividerWhite,
    height: 1
  },
  height: {
    height: height / 11,
    justifyContent: "flex-start"
  },
  image: {
    height: 25,
    marginHorizontal: 25,
    resizeMode: "contain",
    width: 27
  },
  logo: {
    alignSelf: "center",
    height: 79,
    marginTop: 58,
    resizeMode: "contain",
    width: 223
  },
  row,
  text: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: ( fontScale > 1 ) ? 15 : 18,
    letterSpacing: 1.0,
    maxWidth: 226,
    paddingTop: padding.iOSPadding
  },
  textContainer: {
    marginBottom: height / 11,
    marginTop: height / 11 / 2
  }
} );
